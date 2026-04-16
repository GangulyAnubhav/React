import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY

export function verifyToken(request) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return null;
        }

        // Format: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;

    } catch (error) {
        return null;
    }
}