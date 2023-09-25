var _excluded = ["resourceType"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { Menu } from "antd";
import React from "react";
import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";

// 菜单选项渲染
var menuRecursion = function menuRecursion(menuList) {
  if (Array.isArray(menuList)) {
    return menuList.map(function (_ref, index) {
      var resourceType = _ref.resourceType,
          item = _objectWithoutProperties(_ref, _excluded);

      if (Array.isArray(item.children)) {
        return /*#__PURE__*/_createElement(Menu.SubMenu, _objectSpread(_objectSpread({}, item), {}, {
          key: (item === null || item === void 0 ? void 0 : item.key) || index,
          title: item === null || item === void 0 ? void 0 : item.label,
          icon: item === null || item === void 0 ? void 0 : item.icon,
          popupClassName: "hiddenMenus"
        }), menuRecursion(item === null || item === void 0 ? void 0 : item.children));
      } else if (item.type === "divider") {
        return /*#__PURE__*/_createElement(Menu.Divider, _objectSpread(_objectSpread({}, item), {}, {
          key: index
        }));
      } else if (resourceType === 2) {
        return /*#__PURE__*/_createElement(Menu.Item, _objectSpread(_objectSpread({}, item), {}, {
          key: (item === null || item === void 0 ? void 0 : item.key) || index,
          icon: item === null || item === void 0 ? void 0 : item.icon
        }), item === null || item === void 0 ? void 0 : item.label);
      } else {
        return null;
      }
    });
  }
};

var isNotEmpty = function isNotEmpty(arr) {
  return Array.isArray(arr) && arr.length > 0;
};

var isCurrentApp = function isCurrentApp(url, appPrefix) {
  if (url && appPrefix) {
    if ((url === null || url === void 0 ? void 0 : url.indexOf(appPrefix)) === 0) {
      return true;
    }
  }

  return false;
};

var removeUrlBase = function removeUrlBase(url, appPrefix) {
  if (isCurrentApp(url, appPrefix)) {
    return url === null || url === void 0 ? void 0 : url.replace(appPrefix, "");
  }

  return url;
};

var removeUrlQuery = function removeUrlQuery(url) {
  var urlIndex = url === null || url === void 0 ? void 0 : url.indexOf("?");

  if (urlIndex && urlIndex !== -1) {
    return url.slice(0, urlIndex);
  }

  return url;
};

var handleIcon = function handleIcon(icon) {
  if (icon) {
    if (icon !== null && icon !== void 0 && icon.includes(".svg")) {
      return icon.replace(".svg", "");
    }

    return icon;
  }

  return false;
};

var formatIcon = function formatIcon() {
  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/_jsx("span", {
    className: "iconfont icon-".concat(handleIcon(item === null || item === void 0 ? void 0 : item.icon) || "", " layout-icon")
  });
};

var findFirstUsedItem = function findFirstUsedItem(data, type) {
  if (isNotEmpty(data === null || data === void 0 ? void 0 : data.children)) {
    var cur = data.children.find(function (item) {
      return !item.isHidden;
    });

    if (cur) {
      return findFirstUsedItem(cur, type);
    }
  }

  return data;
}; // 是否iframe


var isInIframe = function isInIframe() {
  try {
    var _self$frameElement;

    return self !== top || ((_self$frameElement = self.frameElement) === null || _self$frameElement === void 0 ? void 0 : _self$frameElement.tagName) === "IFRAME" || window.frames.length !== parent.frames.length || window.location.pathname.endsWith("/login");
  } catch (_unused) {
    return true;
  }
};

var batchSetLocalStorage = function batchSetLocalStorage(current) {
  for (var key in current) {
    localStorage.setItem(key, current[key]);
  }
};

var batchSetSessionStorage = function batchSetSessionStorage(current) {
  for (var key in current) {
    sessionStorage.setItem(key, current[key]);
  }
};

var batchSetStorage = function batchSetStorage(current, type) {
  if (!(Object.prototype.toString.call(current) === "[object Object]")) {
    return;
  }

  if ("localStorage" === type) {
    batchSetLocalStorage(current);
  } else if ("sessionStorage" === type) {
    batchSetSessionStorage(current);
  }
};

export { menuRecursion, isNotEmpty, isCurrentApp, removeUrlBase, removeUrlQuery, handleIcon, formatIcon, findFirstUsedItem, isInIframe, batchSetStorage };