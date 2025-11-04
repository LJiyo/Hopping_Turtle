// ## This file is the landing page and Presenter (in the MVP model) ##

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Model components
import Sensors, { Coordinates } from "../utils/Sensors";
import PaceEstimator from "../utils/PaceEstimator";
import ETACalculator from "../utils/ETACalculator";

// View component
import MapAppWidget from "../components/MapAppWidget";

// Landing page
export default function IndexScreen() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [prevLocation, setPrevLocation] = useState<Coordinates | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [eta, setEta] = useState<string>("Calculating...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const destination = { latitude: -36.8485, longitude: 174.7633 }; // dummy destination value

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
    if (location && prevLocation) {
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
  }, [location]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />; // Loading icon

  return (
    // What the user sees. SafeAreaView keeps the content within device screen bounds for 
    // better user view without obstruction of e.g. rounded corners of hardware etc.
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🏃 Hopping Turtle</Text>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      {location && (
        <>
          <Text>Speed: {speed.toFixed(2)} m/s</Text>
          <Text>ETA: {eta}</Text>
          <MapAppWidget userLocation={location} destination={destination} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
});
