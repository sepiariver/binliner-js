"use strict";

var _Symbol$toPrimitive;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$toPrimitive = Symbol.toPrimitive;

var Binliner = function (_Array) {
  _inherits(Binliner, _Array);

  var _super = _createSuper(Binliner);

  function Binliner() {
    var _this;

    _classCallCheck(this, Binliner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "juggle", function (type) {
      if (type === "number") {
        return _this.toNumber();
      }

      return _this.toString();
    });

    _defineProperty(_assertThisInitialized(_this), "set", function (pos, value) {
      _this[pos] = Boolean(value);
      return _assertThisInitialized(_this);
    });

    _defineProperty(_assertThisInitialized(_this), "get", function (pos) {
      return Boolean(_this[pos]);
    });

    _defineProperty(_assertThisInitialized(_this), "setValidation", function (validation) {
      if (Array.isArray(validation) && validation.some(function (v) {
        return !["string", "number"].includes(_typeof(v));
      })) {
        throw new Error("Array validation must contain only strings or numbers.");
      } else if (!Array.isArray(validation) && !["string", "number", "function"].includes(_typeof(validation))) {
        throw new Error("Invalid validation type in config: must be a function, string, number, or array.");
      }

      _this.validation = validation;
    });

    _defineProperty(_assertThisInitialized(_this), "isValid", function () {
      if (typeof _this.validation === "function") {
        return Boolean(_this.validation(_assertThisInitialized(_this)));
      }

      if (Array.isArray(_this.validation)) {
        return _this.validation.some(function (validValue) {
          var coerced = _this.juggle(_typeof(validValue));

          return coerced === validValue;
        });
      }

      if (typeof _this.validation === "string" || typeof _this.validation === "number") {
        return _this.juggle(_typeof(_this.validation)) === _this.validation;
      }

      return false;
    });

    return _this;
  }

  _createClass(Binliner, [{
    key: _Symbol$toPrimitive,
    value: function value(hint) {
      return this.juggle(hint);
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = "";

      for (var i = 0; i < this.length; i++) {
        str += !Boolean(this[i]) || this[i] === "0" ? "0" : "1";
      }

      return str;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return parseInt(this.toString(), 2);
    }
  }]);

  return Binliner;
}(_wrapNativeSuper(Array));

module.exports = Binliner;