function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
var _excluded = ["valueFormat"],
  _excluded2 = ["valueFormat", "defaultDate"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo } from 'react';
import moment from 'moment';
import { getDefaultFormat } from './utils';
import { getMomentValue } from '../utils/method';
var XpDatePicker = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var valueFormat = _ref.valueFormat,
    props = _objectWithoutProperties(_ref, _excluded);
  var defaultFormat = getDefaultFormat(valueFormat, props.picker, props.picker === 'date' ? props.showTime : undefined);
  var defaultValue = props.defaultDate ? moment(props.defaultDate, defaultFormat) : props.defaultValue;
  var momentValue = useMemo(function () {
    var value = props.date || props.value;
    return getMomentValue(value, defaultFormat);
  }, [defaultFormat, props.date, props.value]);
  var handleChange = function handleChange(date, dateString) {
    var _props$onChange, _props$onDateChange;
    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, dateString, date);
    (_props$onDateChange = props.onDateChange) === null || _props$onDateChange === void 0 ? void 0 : _props$onDateChange.call(props, dateString);
  };
  return /*#__PURE__*/React.createElement(_DatePicker, _objectSpread(_objectSpread({
    format: defaultFormat
  }, props), {}, {
    ref: ref,
    value: momentValue,
    onChange: handleChange,
    defaultValue: defaultValue,
    style: _objectSpread({
      width: '100%'
    }, props.style)
  }));
});
export var RangePicker = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var valueFormat = _ref2.valueFormat,
    defaultDate = _ref2.defaultDate,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var defaultFormat = getDefaultFormat(valueFormat, props.picker, !props.picker || props.picker === 'date' ? props.showTime : undefined);
  var getDefaultValue = function getDefaultValue() {
    if (!Array.isArray(defaultDate)) return props.defaultValue;
    var start = defaultDate === null || defaultDate === void 0 ? void 0 : defaultDate[0];
    var end = defaultDate === null || defaultDate === void 0 ? void 0 : defaultDate[0];
    return [start ? moment(start, defaultFormat) : null, end ? moment(end, defaultFormat) : null];
  };
  var momentValue = useMemo(function () {
    var value = props.date || props.value;
    if (!Array.isArray(value)) return value;
    // 避免Invalid date问题
    var start = value === null || value === void 0 ? void 0 : value[0];
    var end = value === null || value === void 0 ? void 0 : value[1];
    var newStart = getMomentValue(start, defaultFormat);
    var newEnd = getMomentValue(end, defaultFormat);
    return [newStart, newEnd];
  }, [defaultFormat, props.date, props.value]);
  var handleChange = function handleChange(dates, dateStrings) {
    var _props$onChange2, _props$onDateChange2;
    (_props$onChange2 = props.onChange) === null || _props$onChange2 === void 0 ? void 0 : _props$onChange2.call(props, dateStrings, dates);
    (_props$onDateChange2 = props.onDateChange) === null || _props$onDateChange2 === void 0 ? void 0 : _props$onDateChange2.call(props, dateStrings);
  };
  return /*#__PURE__*/React.createElement(_DatePicker.RangePicker, _objectSpread(_objectSpread({
    ref: ref,
    format: defaultFormat
  }, props), {}, {
    value: momentValue,
    onChange: handleChange,
    defaultValue: getDefaultValue(),
    style: _objectSpread({
      width: '100%'
    }, props.style)
  }));
});
export default XpDatePicker;