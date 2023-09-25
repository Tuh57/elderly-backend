function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/time-picker/style";
import _TimePicker from "antd/es/time-picker";
var _excluded = ["defaultTime"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React, { useMemo } from 'react';
import moment from 'moment';
import { getMomentValue } from '../utils/method';
var XpTimePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var defaultFormat = typeof props.format === 'string' ? props.format : props.use12Hours ? 'h:mm:ss A' : 'HH:mm:ss';
  var defaultValue = props.defaultTime ? moment(props.defaultTime, defaultFormat) : props.defaultValue;
  var momentValue = useMemo(function () {
    var value = props.time || props.value;
    return getMomentValue(value, defaultFormat);
  }, [defaultFormat, props.time, props.value]);
  var handleChange = function handleChange(time, timeString) {
    var _props$onChange, _props$onTimeChange;
    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, timeString, time);
    (_props$onTimeChange = props.onTimeChange) === null || _props$onTimeChange === void 0 ? void 0 : _props$onTimeChange.call(props, timeString);
  };
  return /*#__PURE__*/React.createElement(_TimePicker, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    value: momentValue,
    onChange: handleChange,
    defaultValue: defaultValue,
    style: _objectSpread({
      width: '100%'
    }, props.style)
  }));
});
export var RangePicker = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var defaultTime = _ref.defaultTime,
    props = _objectWithoutProperties(_ref, _excluded);
  var defaultFormat = typeof props.format === 'string' ? props.format : props.use12Hours ? 'h:mm:ss A' : 'HH:mm:ss';
  var getDefaultValue = function getDefaultValue() {
    if (!Array.isArray(defaultTime)) return props.defaultValue;
    var start = defaultTime === null || defaultTime === void 0 ? void 0 : defaultTime[0];
    var end = defaultTime === null || defaultTime === void 0 ? void 0 : defaultTime[1];
    return [start ? moment(start, defaultFormat) : null, end ? moment(end, defaultFormat) : null];
  };
  var momentValue = useMemo(function () {
    var value = props.time || props.value;
    if (!Array.isArray(value)) return value;
    var start = value === null || value === void 0 ? void 0 : value[0];
    var end = value === null || value === void 0 ? void 0 : value[1];
    var newStart = getMomentValue(start, defaultFormat);
    var newEnd = getMomentValue(end, defaultFormat);
    return [newStart, newEnd];
  }, [defaultFormat, props.time, props.value]);
  var handleChange = function handleChange(values, formatString) {
    var _props$onChange2, _props$onTimeChange2;
    (_props$onChange2 = props.onChange) === null || _props$onChange2 === void 0 ? void 0 : _props$onChange2.call(props, formatString, values);
    (_props$onTimeChange2 = props.onTimeChange) === null || _props$onTimeChange2 === void 0 ? void 0 : _props$onTimeChange2.call(props, formatString);
  };
  return /*#__PURE__*/React.createElement(_TimePicker.RangePicker, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    value: momentValue,
    onChange: handleChange,
    defaultValue: getDefaultValue(),
    style: _objectSpread({
      width: '100%'
    }, props.style)
  }));
});
export default XpTimePicker;