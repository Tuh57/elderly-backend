function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { findFirstUsedItem, isCurrentApp, removeUrlBase } from "../../utils";
import FullScreen from "../FullScreen";
import Logo from "./Logo";
import DropdownComp from "./DropdownComp";
import { history } from "umi";
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";

var HeaderComp = function HeaderComp(props) {
  // organizationInfo, userInfo, loginOut, switchOrg,appPrefix, pathEnum, systemInfo ,headerId,headerMenu
  var Header = Layout.Header; // 菜单

  var headerId = props.headerId,
      headerMenu = props.headerMenu,
      siderMenu = props.siderMenu; // 搜索

  var appPrefix = props.appPrefix,
      pathEnum = props.pathEnum,
      systemInfo = props.systemInfo; // 下拉

  var organizationInfo = props.organizationInfo,
      userInfo = props.userInfo,
      loginOut = props.loginOut,
      switchOrg = props.switchOrg; // 全屏ref

  var fullScreenRef = props.fullScreenRef;

  var selectHeader = function selectHeader(v) {
    var _v$item;

    var _v$item$props = v === null || v === void 0 ? void 0 : (_v$item = v.item) === null || _v$item === void 0 ? void 0 : _v$item.props,
        sidechildren = _v$item$props.sidechildren;

    var firstSide = sidechildren.find(function (item) {
      return !item.isHidden;
    });
    var first = findFirstUsedItem(firstSide ? firstSide : {
      children: []
    });

    if (!isCurrentApp(first === null || first === void 0 ? void 0 : first.url, appPrefix)) {
      window.location.replace(first === null || first === void 0 ? void 0 : first.url);
    } else {
      history.push(removeUrlBase(first === null || first === void 0 ? void 0 : first.url, appPrefix));
    }
  };

  return /*#__PURE__*/_jsxs(Header, {
    className: "layout-header",
    children: [/*#__PURE__*/_jsx(Logo, {
      systemInfo: systemInfo
    }), /*#__PURE__*/_jsx("div", {
      className: "manufacture-head",
      children: /*#__PURE__*/_jsxs(Row, {
        wrap: false,
        children: [/*#__PURE__*/_jsx(Col, {
          flex: 1,
          children: /*#__PURE__*/_jsx(Menu, {
            theme: "light",
            mode: "horizontal",
            selectedKeys: [headerId],
            onSelect: selectHeader,
            children: headerMenu === null || headerMenu === void 0 ? void 0 : headerMenu.map(function (item, index) {
              return /*#__PURE__*/_createElement(Menu.Item, _objectSpread(_objectSpread({}, item), {}, {
                key: (item === null || item === void 0 ? void 0 : item.key) || index,
                icon: item === null || item === void 0 ? void 0 : item.icon
              }), item === null || item === void 0 ? void 0 : item.label);
            })
          })
        }), /*#__PURE__*/_jsxs("div", {
          style: {
            padding: "0 30px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%"
          },
          children: [/*#__PURE__*/_jsx("div", {
            style: {
              padding: "0 10px"
            },
            children: /*#__PURE__*/_jsx(FullScreen, {
              ref: fullScreenRef
            })
          }), /*#__PURE__*/_jsx(DropdownComp, {
            organizationInfo: organizationInfo,
            userInfo: userInfo,
            loginOut: loginOut,
            switchOrg: switchOrg
          })]
        })]
      })
    })]
  });
};

export default HeaderComp;