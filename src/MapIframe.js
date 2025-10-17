import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  height: "600px",
  margin: "50px auto",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const defaultCenter = {
  lat: 49.2827, // Vancouver example
  lng: -123.1207,
};

// Example repair shop locations
const repairLocations = [
  { id: 1, name: "ReSoul Repair - Downtown", lat: 49.282, lng: -123.117 },
  { id: 2, name: "ClimbFix Co.", lat: 49.286, lng: -123.122 },
  { id: 3, name: "Rock Shoe Resolvers", lat: 49.280, lng: -123.125 },
];

const RepairLocator = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#a73200", marginTop: "40px" }}>
        Find Climbing Shoe Repair Services Near You
      </h2>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13}>
          {repairLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              onClick={() => setSelectedMarker(loc)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4>{selectedMarker.name}</h4>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RepairLocator;
