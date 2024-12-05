"use strict";

var _Symbol$toPrimitive;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$toPrimitive = Symbol.toPrimitive;

var Binliner = function () {
  function Binliner(config) {
    var _this = this;

    _classCallCheck(this, Binliner);

    _defineProperty(this, "juggle", function (input, type) {
      if (type === "number") {
        return input;
      }

      return input.toString(2).padStart(_this.size, "0");
    });

    _defineProperty(this, "set", function (pos, value) {
      if (pos < 0 || pos >= _this.size) {
        throw new Error("Illegal position: ".concat(pos));
      }

      var bitIndex = _this.size - 1 - pos;

      if (value) {
        _this.value |= 1 << bitIndex;
      } else {
        _this.value &= ~(1 << bitIndex);
      }

      return _this;
    });

    _defineProperty(this, "get", function (pos) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "number";

      if (pos < 0 || pos >= _this.size) {
        throw new Error("Illegal position: ".concat(pos));
      }

      var bitIndex = _this.size - 1 - pos;
      var bitValue = _this.value >> bitIndex & 1;

      if (type === "string") {
        return bitValue.toString();
      }

      return _this.juggle(bitValue, type);
    });

    _defineProperty(this, "isValid", function () {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (typeof input === "undefined") {
        input = _this.value;
      }

      if (typeof _this.validation === "function") {
        return Boolean(_this.validation(input));
      }

      if (Array.isArray(_this.validation)) {
        return _this.validation.some(function (validValue) {
          if (typeof validValue === "number") {
            return input === validValue;
          }

          return _this.juggle(input, _typeof(validValue)) === validValue;
        });
      }

      if (typeof _this.validation === "string" || typeof _this.validation === "number") {
        return _this.juggle(input, _typeof(_this.validation)) === _this.validation;
      }

      return false;
    });

    if (!config || _typeof(config) !== "object" || config.constructor !== Object) {
      config = {};
    }

    var size = arguments.length <= 1 ? 0 : arguments.length - 1;

    if (typeof config.size === "number" && Number.isInteger(config.size) && config.size > 0) {
      size = config.size;
    } else if (config.size !== undefined) {
      throw new Error("Invalid 'size' in config: must be a positive integer.");
    }

    this.size = size;

    if ((arguments.length <= 1 ? 0 : arguments.length - 1) > this.size) {
      throw new Error("Too many arguments provided (".concat(arguments.length <= 1 ? 0 : arguments.length - 1, ") for the specified size (").concat(this.size, ")."));
    }

    this.value = 0;

    for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); index++) {
      if (index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1]) {
        this.value |= 1 << this.size - 1 - index;
      }
    }

    if (typeof config.validation === "undefined") {
      this.validation = "".padStart(this.size, "1");
    } else {
      this.validation = config.validation;
    }
  }

  _createClass(Binliner, [{
    key: _Symbol$toPrimitive,
    value: function value(hint) {
      return this.juggle(this.value, hint);
    }
  }]);

  return Binliner;
}();

module.exports = Binliner;