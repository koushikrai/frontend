import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

export default function MapView({ emergencyLocation, route }) {
    const mapContainerStyle = { width: '100%', height: '400px' }; // Styling for the map container
    const center = emergencyLocation || { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={center}>
                {/* Marker for the emergency location */}
                {emergencyLocation && <Marker position={emergencyLocation} label="Emergency" />}

                {/* Render the route on the map if available */}
                {route && <DirectionsRenderer directions={route} />}
            </GoogleMap>
        </LoadScript>
    );
}
