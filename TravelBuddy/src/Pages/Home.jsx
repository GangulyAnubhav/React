import './Home.css';
import Navbar from '../Components/Navbar';
import { useState } from "react";

export default function Home() {

  // ✅ State
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    days: "",
    style: "budget",
    specialRequest: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // ✅ API Call
  const handlePlanTrip = async () => {
    setLoading(true);

    try {
      console.log("Inside handlePlanTrip")
      const response = await fetch(
        "http://localhost:7071/api/planTrip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            origin: formData.origin,
            destination: formData.destination,
            days: formData.days,
            style: formData.style,
            specialRequest: formData.specialRequest
          }),
        }
      );

      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log(data);

      setResult(data.data);

    } catch (error) {
      console.error(error);
      alert("Error generating trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Travel Buddy AI</h1>
        <p className="subtitle">Your personal AI trip planner</p>

        <div className="form-card">

          <label>From</label>
          <input type="text" id="origin" placeholder="e.g. Kolkata" onChange={handleChange} />

          <label>Destination</label>
          <input type="text" id="destination" placeholder="e.g. Goa" onChange={handleChange} />

          <label>Number of Days</label>
          <input id="days" placeholder="e.g. 4" onChange={handleChange} />

          <label>Travel Style</label>
          <select id="style" onChange={handleChange}>
            <option value="budget">Budget</option>
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="family">Family</option>
            <option value="honeymoon">Honeymoon</option>
          </select>

          <label>Special Request</label>
          <input
            type="text"
            id="specialRequest"
            placeholder="e.g. Beachfront accommodation, local cuisine"
            onChange={handleChange}
          />

          <button onClick={handlePlanTrip}>
            {loading ? "Planning..." : "Plan My Trip ✈️"}
          </button>

        </div>

        {/* ✅ RESULT SECTION */}
        {result && (
          <div className="result-box mt-3">
            <h2>{result.tripTitle}</h2>
            <p><b>Destination:</b> {result.destination}</p>

            {result.itinerary.map((day) => (
              <div key={day.day}>
                <h3>Day {day.day} - {day.theme}</h3>

                {day.activities.map((act, index) => (
                  <p key={index}>
                    <b>{act.timeOfDay}</b>: {act.title}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}