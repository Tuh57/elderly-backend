import React, { useMemo } from "react";
import { jsx as _jsx } from "react/jsx-runtime";

var Logo = function Logo(_ref) {
  var systemInfo = _ref.systemInfo;
  var LogoMemo = useMemo(function () {
    return /*#__PURE__*/_jsx("div", {
      className: "logo",
      style: {
        minWidth: "230px",
        borderBottom: "1px solid #f3f4f4",
        display: "flex",
        alignItems: "center",
        padding: 16
      },
      children: /*#__PURE__*/_jsx("h1", {
        style: {
          fontSize: 18,
          color: "rgb(21, 24, 29)",
          fontWeight: "bolder",
          margin: "0px 0px 0px 10px",
          whiteSpace: "nowrap",
          display: "inline"
        },
        children: "\u62D3\u666E\u5C45\u5BB6\u517B\u8001\u5E73\u53F0"
      })
    });
  }, [systemInfo]);
  return LogoMemo;
};

export default Logo;