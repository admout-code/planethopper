// import { thousandsWithCommas } from "../utils/thousandsWithCommas";
import { thousandsWithCommas } from "../utils/thousandsWithCommas";

test("10000 to equal 10,000", () => {
  expect(thousandsWithCommas("10000")).toBe("10,000");
});

test("100 to equal 100", () => {
  expect(thousandsWithCommas("100")).toBe("100");
});

test("random text to equal random text", () => {
  expect(thousandsWithCommas("random text")).toBe("random text");
});

test("10000.50 to equal 10000.50", () => {
  expect(thousandsWithCommas("10000.50")).toBe("10,000.50");
});
