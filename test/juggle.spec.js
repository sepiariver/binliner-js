import Binliner from "../dist";

describe("juggle method", () => {
  let binliner;

  beforeAll(() => {
    binliner = new Binliner(true, false, true, false); // Binary: "1010"
  });

  it("returns a base-10 integer for type 'number'", () => {
    const result = binliner.juggle("number");
    expect(result).toBe(10);
  });

  it("returns a padded binary string by default", () => {
    const result = binliner.juggle();
    expect(result).toBe("1010"); // Padded to size 4
  });

  it("handles conversion to a binary string for type 'string'", () => {
    const result = binliner.juggle("string");
    expect(result).toBe("1010"); // Explicit binary string output
  });

  it("handles binary padding correctly", () => {
    const bin = new Binliner(4); // Set four elements
    bin.set(2, true); // Binary: "0010" (2 in base-10)
    expect(String(bin)).toBe("0010");
    expect(Number(bin)).toBe(2);
    const result = bin.toString();
    expect(result).toBe("0010"); // Padded to size 4
  });

});
