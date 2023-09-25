function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Tabs, Dropdown, Menu } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./index.less";
import { history, useAliveController } from "umi";
import { isNotEmpty, removeUrlBase } from "../../utils";
import { MenuOutlined } from "@ant-design/icons";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var KeepAliveTabs = /*#__PURE__*/forwardRef(function (props, ref) {
  // const { tabs, activeTab, removeTabs, clickTabs } = props;
  var appPrefix = props.appPrefix,
      openKeepAlive = props.openKeepAlive;

  var _useAliveController = useAliveController(),
      dropScope = _useAliveController.dropScope;

  var TabPane = Tabs.TabPane;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      pageTabs = _useState2[0],
      setPageTabs = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      activeTab = _useState4[0],
      setActiveTab = _useState4[1];

  var handleActive = function handleActive(key) {
    setActiveTab(key);
  };

  var handleTabClick = function handleTabClick(key) {
    if (key === window.location.pathname) {
      return;
    }

    if (key === activeTab) {
      return;
    }

    var pageTabsItem = pageTabs.find(function (item) {
      return item.key === key;
    });
    handleActive(key);
    history.push(pageTabsItem === null || pageTabsItem === void 0 ? void 0 : pageTabsItem.location);
  }; //移除单个tab


  var removeTabs = function removeTabs(key) {
    if (pageTabs && pageTabs.length > 1) {
      var curTab = pageTabs.find(function (item) {
        return (item === null || item === void 0 ? void 0 : item.key) === key;
      });
      var nextTabs = pageTabs.filter(function (item) {
        return (item === null || item === void 0 ? void 0 : item.key) !== key;
      });
      var nextKey = nextTabs[nextTabs.length - 1].key || "";

      if (curTab) {
        var _window;

        var curKeepAliveKey = removeUrlBase(curTab === null || curTab === void 0 ? void 0 : curTab.keepAliveKey, appPrefix); //关闭layout内部开启的keepalive

        if (openKeepAlive) {
          console.log("drop", curKeepAliveKey);
          dropScope(curKeepAliveKey);
        } //子应用通信


        var messageEvent = new CustomEvent("message");
        messageEvent.data = {
          deleteTab: curTab === null || curTab === void 0 ? void 0 : curTab.keepAliveKey
        };
        (_window = window) === null || _window === void 0 ? void 0 : _window.dispatchEvent(messageEvent); // 执行自定义移除事件

        if (curTab !== null && curTab !== void 0 && curTab.removeFnc && key === activeTab) {
          return curTab === null || curTab === void 0 ? void 0 : curTab.removeFnc(curTab);
        }
      } // 删掉的Tab是当前活动的Tab时


      if (key === activeTab) {
        var nextTab = pageTabs.find(function (item) {
          return (item === null || item === void 0 ? void 0 : item.key) === nextKey;
        });

        if (nextTab) {
          handleActive(nextTab.key);
          history.push(nextTab.location);
        }
      }

      setPageTabs(_toConsumableArray(nextTabs));
    }
  }; // 增加tab


  var addPageTabs = function addPageTabs(newTabs) {
    console.log(newTabs, "newTabs");
    setPageTabs(newTabs);
  }; // 编辑


  var onEdit = function onEdit(targetKey, action) {
    if (action === "remove") {
      removeTabs(targetKey);
    }
  }; // 关闭指定tab


  var closeTab = function closeTab(closeKey) {
    return new Promise(function (resolve) {
      if (isNotEmpty(pageTabs)) {
        var isActive = closeKey && closeKey !== activeTab;
        var nextTabs = pageTabs === null || pageTabs === void 0 ? void 0 : pageTabs.filter(function (item) {
          if (isActive) {
            return (item === null || item === void 0 ? void 0 : item.key) !== closeKey;
          }

          return (item === null || item === void 0 ? void 0 : item.key) !== activeTab;
        });
        addPageTabs(_toConsumableArray(nextTabs));
        setTimeout(function () {
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }; // 自定义关闭tab事件


  var rewriteTabRemoveFnc = function rewriteTabRemoveFnc(callBack) {
    var newPageTabs = _toConsumableArray(pageTabs);

    var curIndex = newPageTabs.findIndex(function (item) {
      return (item === null || item === void 0 ? void 0 : item.key) === activeTab;
    });

    if (curIndex > -1) {
      newPageTabs[curIndex]["removeFnc"] = callBack || null;
      addPageTabs(_toConsumableArray(newPageTabs));
    }
  };

  useImperativeHandle(ref, function () {
    return {
      pageTabs: pageTabs,
      activeTab: activeTab,
      handleActive: handleActive,
      addPageTabs: addPageTabs,
      removeTabs: removeTabs,
      closeTab: closeTab,
      rewriteTabRemoveFnc: rewriteTabRemoveFnc
    };
  });

  var clearTabs = function clearTabs(tabs) {
    if (!Array.isArray(tabs)) return;
    var clearKeys = []; // 清除 keep-alive 缓存

    tabs.forEach(function (item) {
      var _window2;

      clearKeys.push(item.key);
      var curKeepAliveKey = removeUrlBase(item === null || item === void 0 ? void 0 : item.keepAliveKey, appPrefix);

      if (openKeepAlive) {
        dropScope(curKeepAliveKey);
      } // 子应用通信


      var messageEvent = new CustomEvent("message");
      messageEvent.data = {
        deleteTab: item === null || item === void 0 ? void 0 : item.keepAliveKey
      };
      (_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.dispatchEvent(messageEvent);
    });
    var newTabs = pageTabs.filter(function (item) {
      return !clearKeys.includes(item.key);
    });
    setPageTabs(newTabs);
  };
  /**
   * @param type 不传则清除全部
   */


  var handleClear = function handleClear(type) {
    var index = pageTabs.findIndex(function (item) {
      return item.key === activeTab;
    });

    if (index > -1) {
      if (type === "left") {
        var leftTabs = pageTabs.slice(0, index);
        clearTabs(leftTabs);
      } else if (type === "right") {
        var rightTabs = pageTabs.slice(index + 1);
        clearTabs(rightTabs);
      } else {
        var filterTabs = pageTabs.filter(function (item) {
          return item.key !== activeTab;
        });
        clearTabs(filterTabs);
      }
    }
  };

  var menu = /*#__PURE__*/_jsxs(Menu, {
    children: [/*#__PURE__*/_jsx(Menu.Item, {
      onClick: function onClick() {
        return handleClear("left");
      },
      children: "\u6E05\u9664\u5DE6\u8FB9"
    }, "clearLeft"), /*#__PURE__*/_jsx(Menu.Item, {
      onClick: function onClick() {
        return handleClear("right");
      },
      children: "\u6E05\u9664\u53F3\u8FB9"
    }, "clearRight"), /*#__PURE__*/_jsx(Menu.Item, {
      onClick: function onClick() {
        return handleClear();
      },
      children: "\u6E05\u9664\u5176\u4ED6"
    }, "clearAll")]
  }); // console.log(pageTabs, "pageTabs");


  return /*#__PURE__*/_jsx(Tabs, {
    hideAdd: true,
    activeKey: activeTab,
    animated: false,
    type: "editable-card",
    onChange: handleTabClick,
    onEdit: onEdit,
    style: {
      paddingTop: 4
    },
    className: "layout-keep-alive-tabs",
    tabBarExtraContent: pageTabs.length > 2 ? /*#__PURE__*/_jsx(Dropdown, {
      overlay: menu,
      placement: "bottomRight",
      children: /*#__PURE__*/_jsx(MenuOutlined, {
        style: {
          padding: "8px 0"
        }
      })
    }) : undefined,
    id: "antd-pro-components-keep-alive-tabs-index-keep-alive-tabs",
    children: pageTabs.map(function (item) {
      return /*#__PURE__*/_jsx(TabPane, {
        tab: item.title
      }, item.key);
    })
  });
});
export default KeepAliveTabs;