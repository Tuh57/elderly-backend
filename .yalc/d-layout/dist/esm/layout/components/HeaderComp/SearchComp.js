function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useRef, useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { TreeSelect } from "antd";
import { removeUrlBase } from "../../utils";
import { history } from "umi";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var SearchComp = function SearchComp(props) {
  var appPrefix = props.appPrefix,
      headerMenu = props.headerMenu,
      siderMenu = props.siderMenu;
  var searchRef = useRef();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSearch = _useState2[0],
      setIsSearch = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      open = _useState6[0],
      setOpen = _useState6[1];

  var timer = useRef();

  var onReset = function onReset() {
    clearTimeout(timer.current);
    setValue(null);
    setIsSearch(false);
    setTimeout(function () {
      setIsSearch(false);
    }, 200);
  };

  var onSearchPage = function onSearchPage() {
    setIsSearch(true);
    setTimeout(function () {
      var _searchRef$current;

      (_searchRef$current = searchRef.current) === null || _searchRef$current === void 0 ? void 0 : _searchRef$current.focus();
      timer.current = setTimeout(function () {
        setOpen(true);
      }, 300);
    }, 200);
  };

  var onSearchSelect = function onSearchSelect(val, node) {
    if (node.resourceType === 2) {
      setValue(val);
      history.push(removeUrlBase(node === null || node === void 0 ? void 0 : node.url, appPrefix));
    }
  };

  var treeData = useMemo(function () {
    return headerMenu.map(function (item) {
      var data = _objectSpread(_objectSpread({}, item), {}, {
        label: item.name,
        children: siderMenu[item.url]
      });

      return data;
    });
  }, [headerMenu, siderMenu]);
  return /*#__PURE__*/_jsxs("div", {
    style: {
      flex: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        visibility: isSearch ? "hidden" : "visible"
      },
      children: /*#__PURE__*/_jsx(SearchOutlined, {
        onClick: onSearchPage,
        style: {
          color: "rgb(134, 134, 134)"
        }
      })
    }), /*#__PURE__*/_jsx(TreeSelect, {
      showSearch: true,
      open: open,
      value: value,
      ref: searchRef,
      treeData: treeData,
      onBlur: onReset,
      onSelect: onSearchSelect,
      treeNodeFilterProp: "label",
      fieldNames: {
        value: "key"
      },
      placeholder: "\u8BF7\u9009\u62E9\u8981\u8BBF\u95EE\u7684\u83DC\u5355",
      className: isSearch ? "searchMenuDefault searchMenuShow" : "searchMenuDefault searchMenuHidden"
    })]
  });
};

export default SearchComp;