// All files under this folder are part of the Model section in the MVP model.
// This file requests getting the mobile device's GPS data and also handles distance computations
// to pinpoint a user's location.

import * as Location from "expo-location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export default class Sensors {
  static async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  }

  static async watchPosition(callback: (coords: Coordinates) => void) {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000, // 3 seconds
        distanceInterval: 1,
      },
      (loc) => callback(loc.coords)
    );
  }

  // Function to calculate shortest distance between 2 points on a round body i.e. Haversine Formula
  static haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // 6371 kilometers in meters
    const toRad = (x: number) => (x * Math.PI) / 180; // convert to radians
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
