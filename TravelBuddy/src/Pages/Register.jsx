import { useState, useEffect}  from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timer); // cleanup
    }
}, [errorMessage]);

  const handleUserRegistration = async() => {
    
    try {
        const response = await fetch("http://localhost:7071/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log("Registering user with email:", email);
        console.log("Server response:", data);

        if (response.ok) {
            setErrorMessage("");
            alert("Registration successful! Please login.");
            navigate("/login");
        } else {
            setErrorMessage(data.message);
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
  };

  return (
    <>
        <Navbar />
        <div className="auth-container">
        <div className="auth-card">
            <h2>Register</h2>

            <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>
                    {errorMessage}
                </p>
            )}

            <button onClick={handleUserRegistration}>Register</button>

            <div className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
        </div>
    </>
  );
}