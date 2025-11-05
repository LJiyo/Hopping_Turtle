import ETACalculator from "../utils/ETACalculator";
import estimate from "../utils/ETACalculator";

test("calculates ETA based on remaining distance = 20 (meter), speed = 2", () => {
  const eta = ETACalculator.estimate(20, 2);
  expect(eta).toBe("0.2 min(s) to arrival"); // 20/2 = 10, 10/60 = 0.16 -> 0.2 rounded
});

test("No reading given if speed is less than 0.5m/s", () => {
    const eta = ETACalculator.estimate(20, 0.4);
    expect(eta).toBe("N/A")
});

test("No reading given if speed is = 0m/s", () => {
    const eta = ETACalculator.estimate(20, 0);
    expect(eta).toBe("N/A")
});

test("Initial stage where speed < 0 (or some other error)", () => {
    const eta = ETACalculator.estimate(20, -1);
    expect(eta).toBe("Calculating...")
});