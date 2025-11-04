import PaceEstimator from "../utils/PaceEstimator";

test("calculates correct pace", () => {
  const pace = PaceEstimator.calculate(30, 10);
  expect(pace).toBeCloseTo(3.0);
});
