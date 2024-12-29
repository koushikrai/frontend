import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import DirectionsMap from '../components/DirectionsMap';
import { calculateDistance } from '../components/DistanceCalculator';


const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([
    { name: 'Hospital 1', location: { lat: 51.51, lng: -0.1 } },
    { name: 'Hospital 2', location: { lat: 51.49, lng: -0.08 } },
  ]);
  const [nearestHospital, setNearestHospital] = useState(null);

  // Fetch user location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // Calculate nearest hospital
  useEffect(() => {
    if (userLocation && hospitals.length) {
      const destinations = hospitals.map((hospital) => hospital.location);
      calculateDistance(userLocation, destinations).then((distances) => {
        const nearest = distances.reduce((prev, curr, idx) => {
          return curr.distance.value < prev.distance.value
            ? { ...curr, hospital: hospitals[idx] }
            : prev;
        }, distances[0]);
        setNearestHospital(nearest.hospital);
      });
    }
  }, [userLocation, hospitals]);

  return (
    <div>
      <h1>Emergency Medical System</h1>
      <MapComponent userLocation={userLocation} hospitals={hospitals} />
      {nearestHospital && (
        <DirectionsMap
          userLocation={userLocation}
          destination={nearestHospital.location}
        />
      )}
    </div>
  );
};

export default App;
