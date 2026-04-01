import './Home.css';
import Navbar from './Components/Navbar';


export default function Home() {
  return (
    <>
        <Navbar/>
        <div className="container">
            <h1>Travel Buddy AI</h1>
            <p className="subtitle">Your personal AI trip planner</p>

            <div className="form-card">

                <label>From</label>
                <input type="text" id="origin" placeholder="e.g. Kolkata"/>

                <label>Destination</label>
                <input type="text" id="destination" placeholder="e.g. Goa"/>

                <label>Number of Days</label>
                <input id="days" placeholder="e.g. 4"/>

                <label>Travel Style</label>
                <select type="dropdown" id="style">
                    <option value="budget">Budget</option>
                    <option value="luxury">Luxury</option>
                    <option value="adventure">Adventure</option>
                    <option value="family">Family</option>
                    <option value="honeymoon">Honeymoon</option>
                </select>
                
                <label>Special Request</label>
                <input type="text" id="specialRequest" placeholder="e.g. Beachfront accommodation, local cuisine, etc." />

                <button>Plan My Trip ✈️</button>
            </div>

            <div id="result" className="result-box mt-3"></div>

        </div>
    </>
  )
}
