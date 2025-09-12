import { describe, it, expect } from "bun:test";
import Binliner from "../dist";

describe("Binliner Error Modes", () => {
  it("throws an error for invalid validation type", () => {
    const bin = new Binliner();
    expect(() => bin.setValidation({})).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
    expect(() => bin.setValidation(Symbol("invalid"))).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
    expect(() => bin.setValidation(null)).toThrow(
      "Invalid validation type in config: must be a function, string, number, or array."
    );
  });
});
