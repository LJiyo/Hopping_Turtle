// All files under this folder are part of the Model section in the MVP model.
export default class PaceEstimator {
  static calculate(distance: number, time: number): number {
    if (time <= 0) return 0;
    return distance / time; // m/s
  }
}
