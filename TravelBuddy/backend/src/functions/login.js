import { app } from "@azure/functions";
import db, { testDbConnection } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY

app.http('login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            await testDbConnection();
            const { email, password } = await request.json();

            // Validate input
            if (!email || !password) {
                return {
                    status: 400,
                    jsonBody: { message: "Username and password are required" }
                };
            }

            // Get user from DB
            const [user] = await db.query(
                "SELECT * FROM logged_in_users WHERE username = ?",
                [email]
            );
            if (user.length === 0) {
                return {
                    status: 401,
                    jsonBody: { message: "Invalid username or password" }
                };
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user[0].password);
            if (!validPassword) {
                return {
                    status: 401,
                    jsonBody: { message: "Invalid username or password" }
                };
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: user[0].id,
                    username: user[0].username
                },
                JWT_SECRET,
                { expiresIn: "5m" }
            );
            //console.log("Generated JWT token:", token);

            // Send token to frontend
            return {
                status: 200,
                jsonBody: { 
                    message: "Login successful",
                    token : token, 
                    user: { 
                        id: user[0].id, 
                        username: user[0].username
                    }
                }
            };

        } catch (error) {
            console.log("Error during login:", error);
            return {
                status: 500,
                jsonBody: { message: "Server error" }
            };
        }
    }
});