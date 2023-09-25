function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { CompressOutlined, ExpandOutlined } from "@ant-design/icons";
import { jsx as _jsx } from "react/jsx-runtime";
var FullScreen = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$DomName = _ref.DomName,
      DomName = _ref$DomName === void 0 ? "body" : _ref$DomName;
  var documentElement = document;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      fullScreenState = _useState2[0],
      setFullScreenState = _useState2[1]; //全屏状态


  var escFunction = function escFunction() {
    setFullScreenState(function (prevFill) {
      return !prevFill;
    });
  }; //退出全屏


  var exitFullscreen = function exitFullscreen() {
    if (documentElement !== null && documentElement !== void 0 && documentElement.exitFullScreen) {
      documentElement.exitFullScreen();
    } else if (documentElement !== null && documentElement !== void 0 && documentElement.mozCancelFullScreen) {
      documentElement.mozCancelFullScreen();
    } else if (documentElement !== null && documentElement !== void 0 && documentElement.webkitExitFullscreen) {
      documentElement.webkitExitFullscreen();
    } else if (documentElement !== null && documentElement !== void 0 && documentElement.msExitFullscreen) {
      documentElement.msExitFullscreen();
    }
  }; //全屏


  var toFullScreen = function toFullScreen() {
    var el = document.querySelector("".concat(DomName));
    var rfs = (el === null || el === void 0 ? void 0 : el.requestFullScreen) || (el === null || el === void 0 ? void 0 : el.webkitRequestFullScreen) || (el === null || el === void 0 ? void 0 : el.mozRequestFullScreen) || (el === null || el === void 0 ? void 0 : el.msRequestFullScreen);

    if (rfs) {
      rfs.call(el);
    }
  }; // 设置状态


  var setFullScreenStatus = function setFullScreenStatus(flag) {
    if (flag) {
      toFullScreen();
    } else {
      exitFullscreen();
    }
  };

  useImperativeHandle(ref, function () {
    return {
      setFullScreenStatus: setFullScreenStatus,
      fullScreenState: fullScreenState
    };
  }); //监听全屏

  useEffect(function () {
    if (document) {
      var _document, _document2, _document3, _document4;

      (_document = document) === null || _document === void 0 ? void 0 : _document.addEventListener("webkitfullscreenchange", escFunction);
      /* Chrome, Safari and Opera */

      (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.addEventListener("mozfullscreenchange", escFunction);
      /* Firefox */

      (_document3 = document) === null || _document3 === void 0 ? void 0 : _document3.addEventListener("fullscreenchange", escFunction);
      /* Standard syntax */

      (_document4 = document) === null || _document4 === void 0 ? void 0 : _document4.addEventListener("msfullscreenchange", escFunction);
      /* IE / Edge */
    }

    return function () {
      if (document) {
        var _document5, _document6, _document7, _document8;

        (_document5 = document) === null || _document5 === void 0 ? void 0 : _document5.removeEventListener("webkitfullscreenchange", escFunction);
        (_document6 = document) === null || _document6 === void 0 ? void 0 : _document6.removeEventListener("mozfullscreenchange", escFunction);
        (_document7 = document) === null || _document7 === void 0 ? void 0 : _document7.removeEventListener("fullscreenchange", escFunction);
        (_document8 = document) === null || _document8 === void 0 ? void 0 : _document8.removeEventListener("MSFullscreenChange", escFunction);
      }
    };
  }, []);
  return /*#__PURE__*/_jsx("div", {
    children: fullScreenState ? /*#__PURE__*/_jsx(CompressOutlined, {
      style: {
        color: "#474e62"
      },
      onClick: exitFullscreen
    }) : /*#__PURE__*/_jsx(ExpandOutlined, {
      style: {
        color: "#474e62"
      },
      onClick: toFullScreen
    })
  });
});
export default FullScreen;