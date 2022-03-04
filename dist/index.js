"use strict";

var _Symbol$toPrimitive;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$toPrimitive = Symbol.toPrimitive;

var Binliner = /*#__PURE__*/function () {
  function Binliner(config) {
    var _this = this;

    _classCallCheck(this, Binliner);

    _defineProperty(this, "juggle", function (input, type) {
      switch (type) {
        case 'string':
          return String(input);

        case 'number':
          return parseInt(input, 2);

        default:
          return String(input);
      }
    });

    _defineProperty(this, "set", function (pos, value) {
      pos = Math.abs(pos);

      if (pos > _this.size - 1) {
        throw "Illegal position: ".concat(pos);
      }

      var sequence = _this.value.split('');

      sequence[pos] = !!value ? '1' : '0';
      _this.value = sequence.join('');
      return _this;
    });

    _defineProperty(this, "get", function (pos) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'number';
      pos = Math.abs(pos);

      if (pos > _this.size - 1) {
        throw "Illegal position: ".concat(pos);
      }

      return _this.juggle(_this.value[pos], type);
    });

    _defineProperty(this, "isValid", function () {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (typeof input === 'undefined') {
        input = _this;
      }

      if (typeof _this.validation === 'function') {
        return !!_this.validation(input);
      }

      if (Array.isArray(_this.validation)) {
        return _this.validation.some(function (validValue) {
          return !!(_this.juggle(input, _typeof(validValue)) === validValue);
        });
      }

      if (typeof _this.validation === 'string' || typeof _this.validation === 'number') {
        return !!(_this.juggle(input, _typeof(_this.validation)) === _this.validation);
      }

      return false;
    });

    if (config == null) {
      config = {};
    } // Size


    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var size = args.length;

    if (typeof config.size === 'number') {
      size = config.size;
    }

    this.size = Math.abs(parseInt(size, 10));

    if (args.length > this.size) {
      throw 'Too many arguments for size: ' + this.size;
    } // Value


    this.value = '';
    args.forEach(function (arg) {
      _this.value += !arg ? '0' : '1';
    });
    this.value = this.value.padEnd(this.size, '0'); // Initialize with zeros
    // Validator

    if (typeof config.validation === 'undefined') {
      this.validation = ''.padStart(this.size, '1'); // default all 1's
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