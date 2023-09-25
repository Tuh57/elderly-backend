function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/input/style";
import _Input from "antd/es/input";
var _excluded = ["onBlur", "onPressEnter", "onFocus"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useRef } from 'react';
var XpInput = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var onBlur = _ref.onBlur,
    onPressEnter = _ref.onPressEnter,
    onFocus = _ref.onFocus,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var tempValue = useRef();
  // 头尾去空格
  var handleBlur = function handleBlur(e) {
    if (tempValue.current !== e.target.value) {
      var _e$target$value, _restProps$onChange;
      e.target.value = ((_e$target$value = e.target.value) === null || _e$target$value === void 0 ? void 0 : _e$target$value.trim()) || '';
      tempValue.current = e.target.value;
      (_restProps$onChange = restProps.onChange) === null || _restProps$onChange === void 0 ? void 0 : _restProps$onChange.call(restProps, e);
    }
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  };
  // 避免按回车直接查询的情况
  var handlePressEnter = function handlePressEnter(e) {
    var _e$target$value2, _restProps$onChange2;
    e.target.value = ((_e$target$value2 = e.target.value) === null || _e$target$value2 === void 0 ? void 0 : _e$target$value2.trim()) || '';
    onPressEnter === null || onPressEnter === void 0 ? void 0 : onPressEnter(e);
    (_restProps$onChange2 = restProps.onChange) === null || _restProps$onChange2 === void 0 ? void 0 : _restProps$onChange2.call(restProps, e);
  };
  var handleFocus = function handleFocus(e) {
    var _e$target$value3;
    tempValue.current = (_e$target$value3 = e.target.value) === null || _e$target$value3 === void 0 ? void 0 : _e$target$value3.trim();
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
  };
  return /*#__PURE__*/React.createElement(_Input, _objectSpread(_objectSpread({
    allowClear: true,
    maxLength: 50,
    placeholder: "\u8BF7\u8F93\u5165"
  }, restProps), {}, {
    ref: ref,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onPressEnter: handlePressEnter
  }));
});
export default XpInput;