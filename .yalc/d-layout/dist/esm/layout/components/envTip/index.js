function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { CloseOutlined } from "@ant-design/icons";
import { useEnv } from "@mqi/hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

var EnvTip = function EnvTip() {
  var env = useEnv();
  var envName = {
    dev: "开发环境",
    sit: "测试环境",
    uat: "预发布环境",
    "wh-uat": "预发布环境",
    "gz-uat": "预发布环境"
  };
  var showTip = !env.includes("prod");

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      bounds = _useState4[0],
      setBounds = _useState4[1];

  var draggableRef = useRef(null);

  var onStart = function onStart(event, uiData) {
    var _window$document$docu = window.document.documentElement,
        clientWidth = _window$document$docu.clientWidth,
        clientHeight = _window$document$docu.clientHeight;
    var targetRect = draggableRef.current.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };

  return /*#__PURE__*/_jsx(_Fragment, {
    children: showTip && visible && /*#__PURE__*/_jsx(Draggable, {
      bounds: bounds,
      onStart: onStart,
      positionOffset: {
        x: "-50%",
        y: 0
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "env-tip",
        ref: draggableRef,
        children: ["".concat(envName[env] || "测试环境", "\uFF0C\u6570\u636E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5B9E\u9645\u751F\u4EA7"), /*#__PURE__*/_jsx(CloseOutlined, {
          className: "env-tip-btn",
          onClick: function onClick() {
            return setVisible(false);
          }
        })]
      })
    })
  });
};

export default EnvTip;