import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const MapComponent = ({ userLocation, hospitals }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || { lat: 51.505, lng: -0.09 }}
        zoom={13}
      >
        {/* User Marker */}
        {userLocation && <Marker position={userLocation} label="You are here" />}
        
        {/* Hospital Markers */}
        {hospitals &&
          hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={hospital.location}
              label={hospital.name}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
