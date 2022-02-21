class Binliner extends Array {
  constructor(...args) {
    super(...args);
  }

  [Symbol.toPrimitive](hint) {
    return this.juggle(hint);
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.length; i++) {
      str += !Boolean(this[i]) || this[i] === "0" ? "0" : "1";
    }
    return str;
  }

  toNumber() {
    return parseInt(this.toString(), 2);
  }

  juggle = (type) => {
    if (type === "number") {
      return this.toNumber();
    }
    return this.toString();
  };

  set = (pos, value) => {
    this[pos] = Boolean(value);
    return this;
  };

  get = (pos) => {
    return Boolean(this[pos]);
  };

  setValidation = (validation) => {
    if (
      Array.isArray(validation) &&
      validation.some((v) => !["string", "number"].includes(typeof v))
    ) {
      throw new Error("Array validation must contain only strings or numbers.");
    } else if (
      !Array.isArray(validation) &&
      !["string", "number", "function"].includes(typeof validation)
    ) {
      throw new Error(
        "Invalid validation type in config: must be a function, string, number, or array."
      );
    }
    this.validation = validation;
  };

  isValid = () => {
    if (typeof this.validation === "function") {
      return Boolean(this.validation(this));
    }

    if (Array.isArray(this.validation)) {
      return this.validation.some((validValue) => {
        const coerced = this.juggle(typeof validValue);
        return coerced === validValue;
      });
    }

    if (
      typeof this.validation === "string" ||
      typeof this.validation === "number"
    ) {
      // Direct comparison for single validation rule
      return this.juggle(typeof this.validation) === this.validation;
    }

    return false;
  };
}

module.exports = Binliner;
