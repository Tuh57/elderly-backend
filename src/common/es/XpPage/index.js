import React, { useMemo } from 'react';
import "./index.css";
var XpPage = function XpPage(_ref) {
  var children = _ref.children,
    pagePadding = _ref.pagePadding,
    pageClassName = _ref.pageClassName;
  var newChildren = useMemo(function () {
    var childrenArr = Array.isArray(children) ? children : [children];
    return childrenArr.map(function (child, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: (child === null || child === void 0 ? void 0 : child.key) || index,
        style: {
          padding: pagePadding && "0 ".concat(pagePadding, "px")
        },
        className: 'xp-mqi-page-content'
      }, child);
    });
  }, [children, pagePadding]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: pagePadding && "0 -".concat(pagePadding, "px")
    },
    className: "xp-mqi-page ".concat(pageClassName || '')
  }, newChildren);
};
export default /*#__PURE__*/React.memo(XpPage);