class Binliner {
  constructor(config, ...args) {
    if (
      !config ||
      typeof config !== "object" ||
      config.constructor !== Object
    ) {
      config = {};
    }

    let size = args.length;
    if (
      typeof config.size === "number" &&
      Number.isInteger(config.size) &&
      config.size > 0
    ) {
      size = config.size;
    } else if (config.size !== undefined) {
      throw new Error(`Invalid 'size' in config: must be a positive integer.`);
    }
    this.size = size;

    if (args.length > this.size) {
      throw new Error(
        `Too many arguments provided (${args.length}) for the specified size (${this.size}).`
      );
    }

    // Initialize value with binary representation of args expressed as strings
    this.value = args
      .map((arg) => (arg ? "1" : "0"))
      .join("")
      .padEnd(this.size, "0");

    // Validator
    if (typeof config.validation === "undefined") {
      this.validation = "".padStart(this.size, "1"); // default all 1's
    } else {
      this.validation = config.validation;
    }
  }

  [Symbol.toPrimitive](hint) {
    return this.juggle(this.value, hint);
  }

  juggle = (input, type) => {
    switch (type) {
      case "string":
        return String(input);
      case "number":
        return parseInt(input, 2);
      default:
        return String(input);
    }
  };

  set = (pos, value) => {
    pos = Math.abs(pos);
    if (pos > this.size - 1) {
      throw new Error(`Illegal position: ${pos}`);
    }
    const sequence = this.value.split("");
    sequence[pos] = value ? "1" : "0";
    this.value = sequence.join("");
    return this;
  };

  get = (pos, type = "number") => {
    pos = Math.abs(pos);
    if (pos > this.size - 1) {
      throw new Error(`Illegal position: ${pos}`);
    }
    return this.juggle(this.value[pos], type);
  };

  isValid = (input = undefined) => {
    if (typeof input === "undefined") {
      input = this;
    }
    if (typeof this.validation === "function") {
      return Boolean(this.validation(input));
    }
    if (Array.isArray(this.validation)) {
      return this.validation.some((validValue) =>
        Boolean(this.juggle(input, typeof validValue) === validValue)
      );
    }
    if (
      typeof this.validation === "string" ||
      typeof this.validation === "number"
    ) {
      return Boolean(
        this.juggle(input, typeof this.validation) === this.validation
      );
    }

    return false;
  };
}

module.exports = Binliner;
