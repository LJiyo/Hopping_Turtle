import ETACalculator from "../utils/ETACalculator";
import estimate from "../utils/ETACalculator";

test("calculates ETA based on remaining distance = 20 (meter), speed = 2", () => {
  const eta = ETACalculator.estimate(20, 2);
  expect(eta).toBe(10); // 20/2 = 10
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