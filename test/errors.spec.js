import Binliner from "../dist";

describe("Binliner Error Modes", () => {
  it("throws an error for invalid size in config", () => {
    expect(() => new Binliner({ size: -1 })).toThrow(
      "Invalid 'size' in config: must be a positive integer."
    );
    expect(() => new Binliner({ size: 0 })).toThrow(
      "Invalid 'size' in config: must be a positive integer."
    );
    expect(() => new Binliner({ size: 1.5 })).toThrow(
      "Invalid 'size' in config: must be a positive integer."
    );
    expect(() => new Binliner({ size: "4" })).toThrow(
      "Invalid 'size' in config: must be a positive integer."
    );
  });

  it("throws an error for too many arguments", () => {
    expect(() => new Binliner({ size: 2 }, true, false, true)).toThrow(
      "Too many arguments provided (3) for the specified size (2)."
    );
    expect(
      () => new Binliner({ size: 4 }, true, true, true, true, true)
    ).toThrow("Too many arguments provided (5) for the specified size (4).");
  });

  it("throws an error for invalid set position", () => {
    const bin = new Binliner({ size: 4 }, true, false, true, false);
    expect(() => bin.set(-1, true)).toThrow("Illegal position: -1");
    expect(() => bin.set(4, true)).toThrow("Illegal position: 4");
  });

  it("throws an error for invalid get position", () => {
    const bin = new Binliner({ size: 4 }, true, false, true, false);
    expect(() => bin.get(-1)).toThrow("Illegal position: -1");
    expect(() => bin.get(4)).toThrow("Illegal position: 4");
  });

  it("throws an error for invalid validation type", () => {
    expect(() => new Binliner({ validation: {} })).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
    expect(() => new Binliner({ validation: Symbol("invalid") })).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
    expect(() => new Binliner({ validation: null })).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
  });
});
