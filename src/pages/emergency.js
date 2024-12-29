import { useState } from 'react';
import Navbar from '../components/Navbar';
import EmergencyForm from '../components/EmergencyForm';
import MapView from '../components/MapView';

export default function EmergencyPage() {
  const [response, setResponse] = useState(null);

  return (
    <div>
      <Navbar />
      <EmergencyForm onResponse={(data) => setResponse(data)} />
      {response && (
        <MapView
          emergencyLocation={response.emergencyLocation}
          route={response.route}
        />
      )}
    </div>
  );
}
