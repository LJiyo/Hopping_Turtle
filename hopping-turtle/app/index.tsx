import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

// Helper function for calculating distances 
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371000; // meters
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function IndexScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [prevLocation, setPrevLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [eta, setEta] = useState<string>("Calculating...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Destination (a fixed-point dummy value for user destination)
  const destination = { latitude: -36.8485, longitude: 174.7633 };
  
 // Requesting GPS permission from mobile device
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 3000, // 3 seconds
          distanceInterval: 1,
        },
        (loc) => {
          setLocation(loc.coords);
          setLoading(false);
        }
      );
    })();
  }, []); 

  // Computing Distance Travelled by Pace
  useEffect(() => {
    if (location && prevLocation) {
      const distance = haversineDistance(
        prevLocation.latitude,
        prevLocation.longitude,
        location.latitude,
        location.longitude
      );
      const time = 3; // seconds (based on interval)
      const currentSpeed = distance / time;
      setSpeed(currentSpeed);

      const remaining = haversineDistance(
        location.latitude,
        location.longitude,
        destination.latitude,
        destination.longitude
      );
      const etaSec = remaining / (currentSpeed || 1); // avoid divide by zero
      setEta(`${(etaSec / 60).toFixed(1)} min`);
    }
    setPrevLocation(location);
  }, [location]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />; // Loading icon

  return (
    // What the user sees 
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🏃 Hopping Turtle</Text>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      {location && (
        <>
          <Text>Latitude: {location.latitude.toFixed(5)}</Text>
          <Text>Longitude: {location.longitude.toFixed(5)}</Text>
          <Text>Speed: {speed.toFixed(2)} m/s</Text>
          <Text>ETA: {eta}</Text>

          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You" />
            <Marker coordinate={destination} title="Destination" pinColor="blue" />
          </MapView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  map: {
    width: "90%",
    height: 300,
    marginTop: 20,
    borderRadius: 12,
  },
});
