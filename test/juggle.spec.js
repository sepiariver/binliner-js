import Binliner from "../dist";

describe("juggle method", () => {
  let binliner;

  beforeAll(() => {
    binliner = new Binliner({ size: 4 }, true, false, true, false); // Binary: "1010"
  });

  it("returns a base-10 integer for type 'number'", () => {
    const result = binliner.juggle(binliner.value, "number");
    expect(result).toBe(10);
  });

  it("returns a padded binary string by default", () => {
    const result = binliner.juggle(binliner.value);
    expect(result).toBe("1010"); // Padded to size 4
  });

  it("handles conversion to a binary string for type 'string'", () => {
    const result = binliner.juggle(binliner.value, "string");
    expect(result).toBe("1010"); // Explicit binary string output
  });

  it("handles binary padding correctly", () => {
    const smallValue = 2; // Binary: "10"
    const result = binliner.juggle(smallValue);
    expect(result).toBe("0010"); // Padded to size 4
  });

  it("fails on previous 'juggle' version for base-10 integer input", () => {
    const oldJuggle = (input, type) => {
      switch (type) {
        case "string":
          return String(input);
        case "number":
          return parseInt(input, 2);
        default:
          return String(input);
      }
    };

    const invalidResult = oldJuggle(binliner.value, "number");
    expect(invalidResult).not.toBe(10);
    expect(invalidResult).toBe(2);
  });
});
