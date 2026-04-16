import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      if (errorMessage) {
          const timer = setTimeout(() => {
              setErrorMessage("");
          }, 3000);
          
          return () => clearTimeout(timer);
      }
  }, [errorMessage]);

  const handleUserLogin = async () => {
    try {
      const response = await fetch("http://localhost:7071/api/login", {
        method: "POST",
        headers: { 
          "Content-Type" : "application/json"
         },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      //console.log("Logging in user with email:", email);
      //console.log("Server response:", data);

      if (response.ok) {
        setErrorMessage("");
        //alert("Login successful");

        // Store token
        Cookies.set("token", data.token);
        console.log("JWT Token stored in cookies:", Cookies.get("token"));

        // // Save user
        // localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect
        console.log("Redirecting to home page...");
        navigate("/");
      } else {
        setErrorMessage(data.message);
      }

    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <>
        <Navbar />
        <div className="auth-container">
        <div className="auth-card">
            <h2>Login</h2>

            <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </p>
            )}

            <button onClick={handleUserLogin}>Login</button>

            <div className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
        </div>
    </>
  );
}