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

    // Initialize value with binary representation of args
    this.value = 0; // Start with 0
    for (let index = 0; index < args.length; index++) {
      if (args[index]) {
        this.value |= 1 << (this.size - 1 - index); // Map left-to-right index to bit index
      }
    }

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
    if (type === "number") {
      return input;
    }

    return input.toString(2).padStart(this.size, "0");
  };

  set = (pos, value) => {
    if (pos < 0 || pos >= this.size) {
      throw new Error(`Illegal position: ${pos}`);
    }
    const bitIndex = this.size - 1 - pos; // Map left-to-right position to bit index
    if (value) {
      this.value |= 1 << bitIndex;
    } else {
      this.value &= ~(1 << bitIndex);
    }

    return this;
  };

  get = (pos, type = "number") => {
    if (pos < 0 || pos >= this.size) {
      throw new Error(`Illegal position: ${pos}`);
    }
    const bitIndex = this.size - 1 - pos;
    const bitValue = (this.value >> bitIndex) & 1;

    if (type === "string") {
      return bitValue.toString();
    }
    return this.juggle(bitValue, type);
  };

  isValid = (input = undefined) => {
    if (typeof input === "undefined") {
      input = this.value; // Default to the internal integer representation
    }

    if (typeof this.validation === "function") {
      return Boolean(this.validation(input));
    }

    if (Array.isArray(this.validation)) {
      return this.validation.some((validValue) => {
        if (typeof validValue === "number") {
          return input === validValue;
        }

        return this.juggle(input, typeof validValue) === validValue;
      });
    }

    if (
      typeof this.validation === "string" ||
      typeof this.validation === "number"
    ) {
      // Direct comparison for single validation rule
      return this.juggle(input, typeof this.validation) === this.validation;
    }

    return false;
  };
}

module.exports = Binliner;
