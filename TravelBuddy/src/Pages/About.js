import React from 'react'
import './About.css';

export default function About() {
  return (
    <div className="about-container mt-4 ms-20">
        <h1>About TravelBuddy AI</h1>

        <p>
            TravelBuddy AI is an intelligent trip planning assistant designed to help travelers
            create personalized itineraries in seconds. Instead of spending hours researching blogs,
            videos, and travel guides, our AI analyzes your preferences and instantly generates
            a complete travel plan.
        </p>

        <h2>What it can do</h2>
        <ul>
            <li>Generate day-wise travel itineraries</li>
            <li>Suggest places to visit</li>
            <li>Recommend local food</li>
            <li>Adapt plans based on travel style (budget, luxury, adventure, family)</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
            We aim to make travel planning effortless. In the future, TravelBuddy AI will also
            recommend hotels, transportation, and real-time travel updates.
        </p>

    </div>
  )
}
