class Binliner {
  constructor(config, ...args) {
    if (config == null) {
      config = {};
    }
    // Size
    let size = args.length;
    if (typeof config.size === 'number') {
      size = config.size;
    }
    this.size = Math.abs(parseInt(size, 10));
    if (args.length > this.size) {
      throw 'Too many arguments for size: ' + this.size;
    }
    // Value
    this.value = '';
    args.forEach((arg) => {
      this.value += !(arg) ? '0' : '1';
    });
    this.value = this.value.padEnd(this.size, '0'); // Initialize with zeros
    // Validator
    if (typeof config.validation === 'undefined') {
      this.validation = ''.padStart(this.size, '1'); // default all 1's
    } else {
      this.validation = config.validation;
    }
  }

  [Symbol.toPrimitive](hint) {
    return this.juggle(this.value, hint);
  }

  juggle = (input, type) => {
    switch (type) {
      case 'string':
        return String(input);
      case 'number':
        return parseInt(input, 2);
      default:
        return String(input);
    }
  }

  set = (pos, value) => {
    pos = Math.abs(pos);
    if (pos > (this.size - 1)) {
      throw `Illegal position: ${pos}`;
    }
    const sequence = this.value.split('');
    sequence[pos] = !!(value) ? '1' : '0'
    this.value = sequence.join('');
    return this;
  }

  get = (pos, type = 'number') => {
    pos = Math.abs(pos);
    if (pos > (this.size - 1)) {
      throw `Illegal position: ${pos}`;
    }
    return this.juggle(this.value[pos], type);
  }

  isValid = (input = undefined) => {
    if (typeof input === 'undefined') {
      input = this;
    }
    if (typeof this.validation === 'function') {
      return !!(this.validation(input));
    }
    if (Array.isArray(this.validation)) {
      return this.validation.some((validValue) => {
        return !!(this.juggle(input, typeof validValue) === validValue);
      })
    }
    if (typeof this.validation === 'string' || typeof this.validation === 'number') {
      return !!(this.juggle(input, typeof this.validation) === this.validation);
    }
    return false;
  }
}

module.exports = Binliner;
