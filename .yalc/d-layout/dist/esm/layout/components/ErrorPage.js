import React from "react";
import noPageAuthImg from "../../assets/noPageAuth.png";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var ErrorPage = function ErrorPage(_ref) {
  var _ref$errorType = _ref.errorType,
      errorType = _ref$errorType === void 0 ? 401 : _ref$errorType;
  var textObj = {
    401: "无页面权限，请联系管理员开通。",
    500: "应用异常，请刷新后重试。"
  };
  return /*#__PURE__*/_jsxs("div", {
    style: {
      marginTop: "20%",
      textAlign: "center"
    },
    children: [/*#__PURE__*/_jsx("img", {
      src: noPageAuthImg,
      style: {
        width: 240,
        height: 200
      }
    }), /*#__PURE__*/_jsx("div", {
      style: {
        fontSize: 16,
        color: "#00000073"
      },
      children: textObj[errorType]
    })]
  });
};

export default ErrorPage;