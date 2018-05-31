'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Urano = function () {
  function Urano(data, reactions) {
    var _this = this;

    classCallCheck(this, Urano);

    this.$data = data !== undefined ? data : {};
    this.$reactions = this.divideReactions(reactions);

    Object.keys(this.$data).forEach(function (key) {
      return Object.defineProperty(_this, key, {
        get: function get$$1() {
          return _this.$data[key];
        },
        set: function set$$1(newValue) {
          _this.callReaction(key, newValue, key);
          _this.callReaction('$all', newValue, key);

          _this.$data[key] = newValue;
        }
      });
    });
  }

  createClass(Urano, [{
    key: 'divideReactions',
    value: function divideReactions(reactions) {
      switch (typeof reactions === 'undefined' ? 'undefined' : _typeof(reactions)) {
        case 'object':
          return reactions;
        case 'function':
          return { $all: reactions };
        case 'undefined':
          return {};
        default:
          throw new TypeError('"reactions" should be object, function or undefined');
      }
    }
  }, {
    key: 'callReaction',
    value: function callReaction(reactionName, newValue, key) {
      if (this.$reactions[reactionName] !== undefined) {
        this.$reactions[reactionName].call(this, newValue, this.$data[key], key);
      }
    }
  }]);
  return Urano;
}();

module.exports = Urano;
