import { Modal } from "antd";
import React from "react";
import { jsx as _jsx } from "react/jsx-runtime";

var UpdateModal = function UpdateModal(_ref) {
  var visible = _ref.visible,
      changeVisible = _ref.changeVisible;

  // refreshVisible,onUpdatePopover,changeRefreshVisible
  var onUpdatePopover = function onUpdatePopover() {
    window.location.reload();
    changeVisible();
  };

  return /*#__PURE__*/_jsx(Modal, {
    title: "提示",
    open: visible,
    visible: visible,
    onOk: onUpdatePopover,
    onCancel: changeVisible,
    maskClosable: false,
    children: "\u7CFB\u7EDF\u5DF2\u66F4\u65B0\uFF0C\u662F\u5426\u5237\u65B0"
  });
};

export default UpdateModal;