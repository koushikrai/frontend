import { useState } from 'react';
import axios from 'axios';
import MapView from './MapView'; // Ensure proper casing for the component name
import api from "../utils/api"; // Import the Axios instance


export default function EmergencyForm({ onResponse }) {
  const [formData, setFormData] = useState({ address: '', details: '' });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset error
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/controllers/emergencyController`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              address: formAddress,
              details: formDetails,
          }),
      });

      const data = await res.json();
      setResponseMessage(data.message || "Submission successful!");
  }catch (err) {
      console.error("Error submitting emergency:", err);
      setError("Failed to submit emergency. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Details</label>
          <textarea
            placeholder="Enter emergency details"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Emergency'}
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Response Section */}
      {response && (
        <div className="mt-6 space-y-4">
          <MapView emergencyLocation={response.emergencyLocation} route={response.route} />
          <div className="p-4 bg-green-100 rounded-md">
            <h3 className="text-lg font-bold text-green-800">
              Nearest Hospital: {response.nearestHospital.name}
            </h3>
            <p className="text-gray-700">Address: {response.nearestHospital.address}</p>
            <p className="text-gray-700">Route: Check the map above for directions.</p>
          </div>
        </div>
      )}
    </div>
  );
}
