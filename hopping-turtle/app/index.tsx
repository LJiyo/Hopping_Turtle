// ## This file is the landing page and Presenter (in the MVP model) ##

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Model components
import Sensors, { Coordinates } from "../utils/Sensors";
import PaceEstimator from "../utils/PaceEstimator";
import ETACalculator from "../utils/ETACalculator";
import { UserInformationList } from "../dummy_data/UserInformationList";

// View component
import MapAppWidget from "../components/MapAppWidget";

// Landing page
export default function IndexScreen() {
  const [selectedUser, setSelectedUser] = useState(UserInformationList[0]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [prevLocation, setPrevLocation] = useState<Coordinates | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [eta, setEta] = useState<string>("Calculating...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [destination, setDestination] = useState<Coordinates | null>(location);
  //const destination = { latitude: -37.8485, longitude: 174.7633 }; // dummy destination value
  const handleMapPress = (coords: { latitude: number; longitude: number }) => { // Make the destination the user-pressed location
    setDestination(coords);
  };

  // Request GPS data permissions from mobile device
  useEffect(() => {
    (async () => {
      const granted = await Sensors.requestPermissions();
      if (!granted) {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Sensors.watchPosition((coords) => {
        setLocation(coords);
        setLoading(false);
      });
    })();
  }, []);

  // Get user location and calculate distances and ETAs
  useEffect(() => {
    if (location && prevLocation && destination) {
      const distance = Sensors.haversineDistance(
        prevLocation.latitude,
        prevLocation.longitude,
        location.latitude,
        location.longitude
      );

      const currentSpeed = PaceEstimator.calculate(distance, 3);
      setSpeed(currentSpeed);

      const remaining = Sensors.haversineDistance(
        location.latitude,
        location.longitude,
        destination.latitude,
        destination.longitude
      );

      const etaResult = ETACalculator.estimate(remaining, currentSpeed);
      setEta(etaResult);
    }
    setPrevLocation(location);
  }, [location, destination]);

  if (loading) {
    return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />
      <Text>Fetching your current location...</Text>
    </View>
    );} // Loading icon

  return (
    // What the user sees. SafeAreaView keeps the content within device screen bounds for 
    // better user view without obstruction of e.g. rounded corners of hardware etc.
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hopping Turtle</Text>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}

      <Text>User: {selectedUser.name}</Text>
      <Text>Preferred Pace: {selectedUser.preferredPace} m/s</Text>

      <Text style={{marginTop:10}}>
        {destination
          ? `Destination set at: ${destination.latitude.toFixed(4)}, ${destination.longitude.toFixed(4)}`
          : "Tap on the map to set your destination!"
        }
      </Text>
      <Text>(A blue marker appears where tapped on the map)</Text>


      {location ?(
        <>
          <Text>Your Speed: {speed.toFixed(2)} m/s</Text>
          <Text>ETA to Destination: {eta}</Text>

          <MapAppWidget 
            userLocation={location} 
            userdestination={destination} 
            onMapPress={handleMapPress}
          />
          </>
          ) : (
            <Text>Getting your location...</Text>
          )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#f9f9f9" },

  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 16 },

  loading: { 
    alignItems: "center", 
    justifyContent: "center", 
    height: 300 },
});
