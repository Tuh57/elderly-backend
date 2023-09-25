function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import "antd/es/modal/style";
import _Modal from "antd/es/modal";
var _excluded = ["children", "modalLoading", "isDrag", "modalRender"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import "./index.css";
var XpModal = function XpModal(_ref) {
  var children = _ref.children,
    _ref$modalLoading = _ref.modalLoading,
    modalLoading = _ref$modalLoading === void 0 ? false : _ref$modalLoading,
    _ref$isDrag = _ref.isDrag,
    isDrag = _ref$isDrag === void 0 ? false : _ref$isDrag,
    modalRender = _ref.modalRender,
    restProps = _objectWithoutProperties(_ref, _excluded);
  // 拖拽的逻辑
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    disabled = _useState2[0],
    setDisabled = _useState2[1];
  var draggableModalRef = useRef(null);
  var _useState3 = useState({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    dragBounds = _useState4[0],
    setDragBounds = _useState4[1];
  var onDragStart = function onDragStart(event, uiData) {
    var _window$document$docu = window.document.documentElement,
      clientWidth = _window$document$docu.clientWidth,
      clientHeight = _window$document$docu.clientHeight;
    var targetRect = draggableModalRef.current.getBoundingClientRect();
    setDragBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };
  return (
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(_Modal, _objectSpread(_objectSpread({
      maskClosable: false
    }, restProps), {}, {
      wrapClassName: "xp-mqi-modal ".concat((restProps === null || restProps === void 0 ? void 0 : restProps.wrapClassName) || ''),
      bodyStyle: _objectSpread({
        padding: '16px 16px 0'
      }, restProps === null || restProps === void 0 ? void 0 : restProps.bodyStyle),
      title: restProps.title ? /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          cursor: isDrag ? 'move' : 'default'
        },
        onMouseOver: function onMouseOver() {
          return disabled && setDisabled(false);
        },
        onMouseOut: function onMouseOut() {
          return setDisabled(true);
        }
      }, restProps.title) : undefined,
      modalRender: isDrag ? function (modal) {
        return /*#__PURE__*/React.createElement(Draggable, {
          disabled: disabled,
          bounds: dragBounds,
          onStart: onDragStart
        }, /*#__PURE__*/React.createElement("div", {
          ref: draggableModalRef
        }, modalRender ? modalRender(modal) : modal));
      } : modalRender
    }), /*#__PURE__*/React.createElement(_Spin, {
      spinning: modalLoading
    }, children))
  );
};
export default /*#__PURE__*/React.memo(XpModal);