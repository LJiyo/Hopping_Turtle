// This is the View part of the MVP model.

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

interface MapProps { // relevant user information needed by the Model i.e. under utils folder
  userLocation: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

// Little Map displayed on screen
const MapAppWidget: React.FC<MapProps> = ({ userLocation, destination }) => {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={userLocation} title="You" />
      <Marker coordinate={destination} title="Destination" pinColor="blue" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: 300,
    borderRadius: 12,
    marginTop: 20,
  },
});

export default MapAppWidget;
