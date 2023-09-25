function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Layout, Menu } from "antd";
import { history } from "umi";
import { isCurrentApp, menuRecursion, removeUrlBase } from "../../utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SiderComp = /*#__PURE__*/forwardRef(function (props, ref) {
  var Sider = Layout.Sider;
  var siderId = props.siderId,
      headerId = props.headerId,
      siderMenu = props.siderMenu,
      defaultHeadId = props.defaultHeadId,
      appPrefix = props.appPrefix;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      openKeys = _useState4[0],
      setOpenKeys = _useState4[1];

  var toggleCollapsed = function toggleCollapsed() {
    setCollapsed(!collapsed);
  };

  var changeCollapsed = function changeCollapsed(flag) {
    setCollapsed(flag);
  };

  var onChangeOpen = function onChangeOpen(keys) {
    setOpenKeys(keys);
  };

  var handleOpenkeys = function handleOpenkeys(list) {
    var keys = [];
    list === null || list === void 0 ? void 0 : list.forEach(function (item) {
      keys.push(item === null || item === void 0 ? void 0 : item.url);
    });
    onChangeOpen(keys);
  };

  var selectSider = function selectSider(v) {
    if (!isCurrentApp(v === null || v === void 0 ? void 0 : v.key, appPrefix)) {
      window.location.replace(v === null || v === void 0 ? void 0 : v.key);
    } else {
      history.push(removeUrlBase(v === null || v === void 0 ? void 0 : v.key, appPrefix));
    }
  };

  useImperativeHandle(ref, function () {
    return {
      handleOpenkeys: handleOpenkeys,
      changeCollapsed: changeCollapsed
    };
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Sider, {
      width: 230,
      className: "layout-menu",
      collapsed: collapsed,
      style: {
        overflowY: "auto",
        height: "calc(100vh - 65px)"
      },
      children: /*#__PURE__*/_jsx(Menu, {
        mode: "inline",
        inlineIndent: 10,
        style: {
          height: "100%",
          borderRight: 0
        },
        selectedKeys: [siderId],
        onClick: selectSider,
        openKeys: openKeys,
        onOpenChange: onChangeOpen,
        children: siderMenu && menuRecursion(siderMenu[headerId || defaultHeadId])
      })
    }), /*#__PURE__*/_jsx("div", {
      className: collapsed ? "toggle-span toggle-putAway" : "toggle-span toggle-expand",
      onClick: toggleCollapsed
    })]
  });
});
export default SiderComp;