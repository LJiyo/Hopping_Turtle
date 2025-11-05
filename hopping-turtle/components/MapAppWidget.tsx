// This is the View part of the MVP model. It handles the map display of user location, destination and handling
// an onMapPress event.

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

interface MapProps { // relevant user information needed by the Model from Presenter i.e. under utils folder
  userLocation: { latitude: number; longitude: number };
  userdestination: { latitude: number; longitude: number };
  onMapPress?: (coords: { latitude: number; longitude: number }) => void; // destination coordinates upon user tap on map (function)
}

// Little Map displayed on screen
// This takes the properties defined from above and uses them
const MapAppWidget: React.FC<MapProps> = ({ userLocation, userdestination, onMapPress}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onPress={(e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        onMapPress && onMapPress({ latitude, longitude }); // function call if function exists
      }}
      showsMyLocationButton={false}
    >
      {userLocation && <Marker coordinate={userLocation} title="You" />}
      {userdestination && <Marker coordinate={userdestination} title="Destination" pinColor="blue" />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: 500,
    borderRadius: 12,
    marginTop: 20,
  },
});

export default MapAppWidget;
