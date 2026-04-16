import { app } from "@azure/functions";
import db, { testDbConnection } from "../config/db.js";
import bcrypt from "bcryptjs";

app.http('register', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            await testDbConnection();

            const { email, password } = await request.json();

            if (!email || !password) {
                return {
                    status: 400,
                    jsonBody: { message: "Username and password are required" }
                };
            }

            // Check if user already exists
            const [existingUser] = await db.query(
                "SELECT * FROM logged_in_users WHERE username = ?",
                [email]
            );

            if (existingUser.length > 0) {
                return {
                    status: 409,
                    jsonBody: { message: "Username already exists" }
                };
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            await db.query(
                "INSERT INTO logged_in_users (username, password) VALUES (?, ?)",
                [email, hashedPassword]
            );

            return {
                status: 201,
                jsonBody: { message: "User registered successfully" }
            };

        } catch (error) {
            console.log("Error during registration:", error);

            return {
                status: 500,
                jsonBody: { message: "Server error" }
            };
        }
    }
});