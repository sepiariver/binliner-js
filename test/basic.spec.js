import Binliner from "../dist";

describe("Binliner", () => {
  it("does binary string validation", () => {
    const bin = new Binliner(true, false); // Instantiate like Array
    expect(bin.length).toBe(2);
    expect(String(bin)).toBe("10");
    expect(Number(bin)).toBe(2);
    bin.setValidation("11");
    expect(bin.validation).toBe("11");
    expect(bin.isValid()).toBeFalsy();
    bin.set(1, 1);
    expect(String(bin)).toBe("11");
    expect(bin.isValid()).toBeTruthy();
  });

  it("does array validation", () => {
    const bin = new Binliner(2); // Instantiate like Array
    console.log(bin);
    expect(bin.length).toBe(2);
    expect(String(bin)).toBe("00");
    expect(Number(bin)).toBe(0);
    bin.setValidation([1, 2]);
    expect(bin.isValid()).toBeFalsy();
    bin.set(0, 1);
    expect(String(bin)).toEqual("10");
    expect(Number(bin)).toBe(2);
    expect(bin.isValid()).toBeTruthy();
    bin.set(1, 1);
    expect(String(bin)).toEqual("11");
    expect(Number(bin)).toBe(3);
    expect(bin.isValid()).toBeFalsy();
    expect(bin.get(1)).toBe(true);
    bin.set(0, 0);
    expect(String(bin)).toEqual("01");
    expect(Number(bin)).toBe(1);
    expect(bin.isValid()).toBeTruthy();
  });

  it("set is chainable", () => {
    const bin = new Binliner(3);
    bin.setValidation([5]);
    expect(String(bin)).toEqual("000");
    expect(bin.isValid()).toBeFalsy();
    bin.set(0, 1).set(1, 0).set(2, 1);
    expect(String(bin)).toEqual("101");
    expect(bin.isValid()).toBeTruthy();
    bin.set(0, 1).set(1, 1).set(2, 1);
    expect(String(bin)).toEqual("111");
    expect(bin.isValid()).toBeFalsy();
  });

  it("does basic validation with arguments of different types", () => {
    let bin = new Binliner(false, false);
    expect(String(bin)).toEqual("00");
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner({}, null);
    expect(String(bin)).toEqual("10");
    bin.setValidation([1, 2]);
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner("true", "false");
    expect(String(bin)).toEqual("11");
    bin.setValidation([1, 2]);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(undefined, []);
    expect(String(bin)).toEqual("01");
    bin.setValidation([1, 2]);
    expect(bin.isValid()).toBeTruthy();
  });

  it("validates against a number with arguments of different types", () => {
    let bin = new Binliner(false, false);
    expect(String(bin)).toEqual("00");
    bin.setValidation(1);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner({}, null);
    expect(String(bin)).toEqual("10");
    bin.setValidation(1);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner("true", "false");
    expect(String(bin)).toEqual("11");
    bin.setValidation(1);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(undefined, []);
    expect(String(bin)).toEqual("01");
    bin.setValidation(1);
    expect(bin.isValid()).toBeTruthy();
  });

  it("validates against a string with arguments of different types", () => {
    let bin = new Binliner(false, false);
    expect(String(bin)).toEqual("00");
    bin.setValidation("11");
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner({}, null);
    expect(String(bin)).toEqual("10");
    bin.setValidation("11");
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner("true", "false");
    expect(String(bin)).toEqual("11");
    bin.setValidation("11");
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(undefined, []);
    expect(String(bin)).toEqual("01");
    bin.setValidation("11");
    expect(bin.isValid()).toBeFalsy();
  });

  it("validates against a function", () => {
    const validator = (input) => {
      return Number(input) > 2;
    };
    let bin = new Binliner(false, false);
    expect(String(bin)).toEqual("00");
    bin.setValidation(validator);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner({}, null);
    expect(String(bin)).toEqual("10");
    bin.setValidation(validator);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner("true", "false");
    expect(String(bin)).toEqual("11");
    bin.setValidation(validator);
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(undefined, []);
    expect(String(bin)).toEqual("01");
    bin.setValidation(validator);
    expect(bin.isValid()).toBeFalsy();
  });

  it("validates against an array of different types", () => {
    let bin = new Binliner(false, false);
    expect(String(bin)).toEqual("00");
    bin.setValidation(["11", 2]);
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner({}, null);
    expect(String(bin)).toEqual("10");
    bin.setValidation(["11", 2]);
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner("true", "false");
    expect(String(bin)).toEqual("11");
    bin.setValidation(["11", 2]);
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(undefined, []);
    expect(String(bin)).toEqual("01");
    bin.setValidation(["11", 2]);
    expect(bin.isValid()).toBeFalsy();
  });
});
