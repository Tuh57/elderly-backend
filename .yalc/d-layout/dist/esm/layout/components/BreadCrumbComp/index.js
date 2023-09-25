function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Breadcrumb } from "antd";
import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { isNotEmpty, removeUrlBase } from "../../utils";
import { history } from "umi";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BreadCrumbComp = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var appPrefix = _ref.appPrefix;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      breadcrumbList = _useState2[0],
      setBreadcrumbList = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      allSideElement = _useState4[0],
      setAllSideElement = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      rightSideElement = _useState6[0],
      setRightSideElement = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      flag = _useState8[0],
      setFlag = _useState8[1];

  var fromatBreadCrumbs = function fromatBreadCrumbs(list) {
    var breads = [];

    if (isNotEmpty(list)) {
      list === null || list === void 0 ? void 0 : list.forEach(function (item) {
        breads === null || breads === void 0 ? void 0 : breads.push({
          url: item === null || item === void 0 ? void 0 : item.url,
          resourceType: item === null || item === void 0 ? void 0 : item.resourceType,
          title: (item === null || item === void 0 ? void 0 : item.resourceName) || (item === null || item === void 0 ? void 0 : item.name)
        });
      });
    }

    return breads;
  };

  var breadcrumbSettings = function breadcrumbSettings() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        breadcrumbs = _ref2.breadcrumbs,
        allSideElement = _ref2.allSideElement,
        rightSideElement = _ref2.rightSideElement;

    if (breadcrumbs) {
      setFlag(true);
      setBreadcrumbList(breadcrumbs);
    }

    setAllSideElement(allSideElement);
    setRightSideElement(rightSideElement);
  };

  var setBreadCrumbs = function setBreadCrumbs(list) {
    setFlag(false);
    setBreadcrumbList(list);
    setAllSideElement(null);
    setRightSideElement(null);
  };

  useImperativeHandle(ref, function () {
    return {
      setBreadCrumbs: setBreadCrumbs,
      breadcrumbSettings: breadcrumbSettings
    };
  });
  var breadCrumbDom = useMemo(function () {
    var breads = fromatBreadCrumbs(breadcrumbList);

    var BreadcrumbElement = /*#__PURE__*/_jsx(Breadcrumb, {
      separator: ">",
      style: {
        padding: "5px 0 0 10px",
        backgroundColor: "white"
      },
      children: breads === null || breads === void 0 ? void 0 : breads.map(function (item, index) {
        if (flag) {
          return /*#__PURE__*/_jsx(Breadcrumb.Item, {
            children: item !== null && item !== void 0 && item.callBack ? /*#__PURE__*/_jsx("a", {
              onClick: item === null || item === void 0 ? void 0 : item.callBack,
              children: item === null || item === void 0 ? void 0 : item.name
            }) : item === null || item === void 0 ? void 0 : item.name
          }, item === null || item === void 0 ? void 0 : item.name);
        }

        var isNotLast = index + 1 !== (breads === null || breads === void 0 ? void 0 : breads.length);
        return /*#__PURE__*/_jsx(Breadcrumb.Item, {
          className: isNotLast && item.resourceType === 2 ? "mqi-bread-hover-btn" : "",
          onClick: function onClick() {
            if (isNotLast && item.resourceType === 2) {
              history.push(removeUrlBase(item.url, appPrefix));
            }
          },
          children: item === null || item === void 0 ? void 0 : item.title
        }, item === null || item === void 0 ? void 0 : item.url);
      })
    });

    if (allSideElement) {
      return /*#__PURE__*/_jsx("div", {
        className: "mqi-bread mqi-bread-custom",
        children: allSideElement
      });
    } else if (rightSideElement) {
      return /*#__PURE__*/_jsxs("div", {
        className: "mqi-bread",
        children: [/*#__PURE__*/_jsx("div", {
          className: "mqi-bread-title",
          children: BreadcrumbElement
        }), /*#__PURE__*/_jsx("div", {
          className: "mqi-bread-custom",
          children: rightSideElement
        })]
      });
    }

    return /*#__PURE__*/_jsx("div", {
      className: "mqi-bread",
      children: BreadcrumbElement
    });
  }, [breadcrumbList, rightSideElement, allSideElement, flag]);
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: breadCrumbDom
  });
});
export default BreadCrumbComp;