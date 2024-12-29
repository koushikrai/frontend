import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import DirectionsMap from "../components/DirectionsMap";
import api from "../utils/api"; // Import the Axios instance
import axios from 'axios';

const App = () => {
  const [formAddress, setFormAddress] = useState(null); 
  const [formDetails, setFormDetails] = useState(null);// Form data submitted by the user
  const [response, setResponse] = useState(null); // Response from backend
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const handleEmergencySubmit = async (data) => {
    setLoading(true); // Show loading while processing
    try {
      const res = await api.post("http://localhost:3001/controllers/emergencyController", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: formAddress,
            details: formDetails,
        }),
    });}
    catch (error) {
      console.error("Error submitting emergency:", error);
      alert("Error processing emergency. Please try again.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-blue-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">Emergency Medical System</h1>
        <p className="mt-4">
          Submit an emergency and find the shortest route to the nearest hospital.
        </p>
      </header>
      <main className="py-10">
        <div className="container mx-auto px-4">
          {/* Show EmergencyForm if no response is received */}
          {!response ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Form</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = {
                    address: e.target.address.value,
                    details: e.target.details.value,
                  };
                  handleEmergencySubmit(data);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-700 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Details</label>
                  <textarea
                    name="details"
                    placeholder="Enter emergency details"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Emergency"}
                </button>
              </form>
            </div>
          ) : (
            // Display the Map and Directions once the response is available
            <div>
              <MapComponent
                userLocation={response.emergencyLocation}
                hospitals={[response.nearestHospital]}
              />
              <DirectionsMap
                userLocation={response.emergencyLocation}
                destination={{
                lat: response.nearestHospital.location.lat,
                lng: response.nearestHospital.location.lng,
                              }}
              />

              <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                <h3 className="text-lg font-bold">
                  Nearest Hospital: {response.nearestHospital.name}
                </h3>
                <p>Address: {response.nearestHospital.address}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-blue-800 text-white p-6 text-center">
        <p>&copy; 2024 Emergency Medical System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
