import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = Cookies.get("token");

    // No token → redirect to login
    if (!token) {
        navigate("/login");
        return null;
    }

    // Token exists → allow access
    return children;
}