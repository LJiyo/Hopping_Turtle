// All files under this folder are part of the Model section in the MVP model.
export default class ETACalculator {
  static estimate(distance: number, speed: number): string {
    if (speed < 0) return "Calculating...";
    if (speed == 0 || speed < 0.5) return "N/A";
    const seconds = distance / speed;
    return `${(seconds / 60).toFixed(1)} min(s) to arrival`;
  }
}
