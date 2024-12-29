import { useState } from "react";
import Navbar from "../components/Navbar";
import EmergencyForm from "../components/EmergencyForm";
import MapView from "../components/MapView";

export default function EmergencyPage() {
  const [response, setResponse] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-blue-600 text-white p-8 text-center">
        <h2 className="text-3xl font-bold">Emergency Assistance</h2>
        <p className="mt-2">Submit an emergency, and well connect you to the nearest hospital.</p>
      </header>
      <main className="py-10">
        <div className="container mx-auto px-4">
          <EmergencyForm onResponse={(data) => setResponse(data)} />
          {response && (
            <div className="mt-10">
              <MapView
                emergencyLocation={response.emergencyLocation}
                route={response.route}
              />
              <div className="mt-6 p-6 bg-green-100 text-green-800 rounded-lg">
                <h3 className="text-lg font-bold">
                  Nearest Hospital: {response.nearestHospital.name}
                </h3>
                <p>Address: {response.nearestHospital.address}</p>
                <p>Route: See the map above for directions.</p>
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
}
