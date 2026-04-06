import { app } from "@azure/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

app.http('planTrip', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {        
        try {
            if (!genAI) {
                context.log("GEMINI_API_KEY is missing.");
                return { status: 500, body: "Server Error: API Key missing." };
            }

            const reqBody = await request.json();
            const { origin,destination, days, style, specialRequest } = reqBody; // Assuming structured input
            console.log(`Received request: From=${origin}, Destination=${destination}, Days=${days}, Style=${style}`);

            if (!destination) {
                return { status: 400, body: "Destination is required." };
            }

            // Generative Model Initialization
            console.log("API HIT");
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash-lite", 
                systemInstruction: "You are a travel API. Return ONLY valid JSON. No conversational text, no markdown backticks or extra text.",
            });

            // 4. Structuring Prompt Building

            const prompt = `
            Create a COMPLETE, FINALIZED ${days}-day travel plan from "${origin}" to "${destination}" for a "${style}" trip.

            IMPORTANT RULES:
            - Do NOT provide multiple options or suggestions.
            - Select ONE BEST travel option for everything (transport, hotels, activities).
            - The plan must be DIRECTLY FOLLOWABLE by the user without needing to decide anything.

            ========================

            TRAVEL PLAN REQUIREMENTS:

            1. Provide the FINAL travel plan from "${origin}" to "${destination}":
            - Select ONE mode of transport (flight/train/bus/car)
            - Include exact guidance (how to book, when to depart, duration)
            - Include estimated cost

            2. Provide the FINAL return plan from "${destination}" to "${origin}":
            - One selected mode only
            - Include cost and timing guidance

            3. DURING THE TRIP:
            - Strictly follow "${style}" travel style
            - Provide a fixed hotel recommendation (no multiple choices)
            - Include daily transport plan (exact modes to use)
            - Include special requests: "${specialRequest}" properly distributed

            4. DAILY EXECUTION PLAN:
            - Each day must be fully planned from morning to evening
            - Include exact places, food, and experiences
            - Include time-of-day flow (morning, afternoon, evening)
            - Include cost for each activity
            - Include total daily cost

            5. BUDGET:
            - Provide realistic per-day cost
            - Provide total trip cost
            - No vague ranges — give clear estimates

            ========================

            OUTPUT FORMAT:

            Return ONLY valid JSON in the following format:

            {
            "tripTitle": "string",

            "travelPlan": {
                "fromOriginToDestination": {
                "mode": "Final selected transport",
                "departureDetails": "When and how to depart",
                "duration": "Total travel time",
                "estimatedCost": "Cost per person",
                "instructions": "Step-by-step travel instructions"
                },
                "returnToOrigin": {
                "mode": "Final selected transport",
                "departureDetails": "Return timing",
                "duration": "Travel time",
                "estimatedCost": "Cost per person",
                "instructions": "Return instructions"
                }
            },

            "totalDays": ${days},
            "styleApplied": "${style}",

            "budgetSummary": {
                "averageDailyCost": "Exact cost per day",
                "totalTripCost": "Total cost for entire trip"
            },

            "stay": {
                "hotelName": "Single selected hotel",
                "category": "Budget | Mid-range | Luxury",
                "pricePerNight": "Cost",
                "reason": "Why it fits the style"
            },

            "itinerary": [
                {
                "day": 1,
                "theme": "Day theme",
                "totalDailyCost": "Total cost for the day",
                "activities": [
                    {
                    "timeOfDay": "Morning | Afternoon | Evening",
                    "title": "Activity name",
                    "description": "What exactly to do",
                    "location": "Place name",
                    "estimatedCost": "Exact cost",
                    "transport": "Exact transport to use"
                    }
                ]
                }
            ]
            }
            `;

            const result = await model.generateContent(prompt);
            const text = result.response.text();

            // 5. Clean & Parse JSON
            const cleanJson = text.replace(/```json|```/g, "").trim();
            const travelData = JSON.parse(cleanJson);
            console.log(JSON.stringify(travelData.itinerary[0].activities, null, 2));

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    data: travelData
                },
            };

        } catch (error) {
            context.log("Error in planTrip:", error);
            
            // Handle Quota Error specifically
            if (error.status === 429) {
                return {
                    status: 429,
                    jsonBody: { error: "Quota exceeded. Please try again in a few minutes." }
                };
            }

            return {
                status: 500,
                jsonBody: { error: "Failed to generate travel plan." },
            };
        }
    },
});