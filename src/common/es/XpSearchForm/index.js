function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/grid/style";
import _Grid from "antd/es/grid";
var _excluded = ["loading", "defaultExpanded", "isQueryAfterReset", "minCount", "onExpend", "children", "onSearch", "onReset", "buttons"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import "./index.css";
/**
 * 基于antd栅格布局的searchForm组件
 * @param {number} minCount 最少默认展示几个字段 不能大于显示的字段总数
 * @param {boolean} defaultExpanded 默认是否展开表单
 * @param {() => void} onExpend 切换展开的回调
 * @param {boolean} isQueryAfterReset 重置后是否重新查询数据
 */
var XpSearchForm = function XpSearchForm(_ref) {
  var _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$defaultExpanded = _ref.defaultExpanded,
    defaultExpanded = _ref$defaultExpanded === void 0 ? false : _ref$defaultExpanded,
    _ref$isQueryAfterRese = _ref.isQueryAfterReset,
    isQueryAfterReset = _ref$isQueryAfterRese === void 0 ? false : _ref$isQueryAfterRese,
    minCount = _ref.minCount,
    onExpend = _ref.onExpend,
    children = _ref.children,
    onSearch = _ref.onSearch,
    onReset = _ref.onReset,
    buttons = _ref.buttons,
    props = _objectWithoutProperties(_ref, _excluded);
  // 获取屏幕属性
  var screen = _Grid.useBreakpoint();
  var rowMaxCount = screen.xxl ? 4 : screen.xl ? 3 : 2;
  var _useState = useState(defaultExpanded),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setIsExpanded = _useState2[1];
  var formChildren = useMemo(function () {
    var childrenArray = (Array.isArray(children) ? children : [children]).filter(Boolean);
    // 表单的字段
    // @ts-ignore
    var hiddenChildren = childrenArray.filter(function (item) {
      var _item$props;
      return item === null || item === void 0 ? void 0 : (_item$props = item.props) === null || _item$props === void 0 ? void 0 : _item$props.hidden;
    });
    // @ts-ignore
    var visibleChildren = childrenArray.filter(function (item) {
      var _item$props2;
      return !(item === null || item === void 0 ? void 0 : (_item$props2 = item.props) === null || _item$props2 === void 0 ? void 0 : _item$props2.hidden);
    });
    var fixMinCount;
    if (minCount) {
      // 避免minCount大于字段总数
      fixMinCount = minCount >= visibleChildren.length ? visibleChildren.length : minCount;
    }
    // 有多少列表单需要展示
    var count = isExpanded ? visibleChildren.length : fixMinCount || rowMaxCount - 1;
    // 是否显示展开收起按钮
    var showExpandBtn = fixMinCount ? visibleChildren.length > fixMinCount : visibleChildren.length > rowMaxCount - 1;
    // 给显示的字段包上一层col
    var visibleChildrenCols = visibleChildren.map(function (child, index) {
      return /*#__PURE__*/React.createElement(_Col, {
        span: 8,
        xxl: 6,
        xl: 8,
        lg: 12,
        md: 12,
        xs: 12,
        // eslint-disable-next-line react/no-array-index-key
        key: index,
        style: {
          display: index >= count ? 'none' : 'initial'
        }
      }, child);
    });
    var calcBottonGroupOffset = function calcBottonGroupOffset() {
      if (count % rowMaxCount === 0) {
        return screen.xxl ? 18 : screen.xl ? 16 : 12;
      }
      var offset = 0;
      if (count > visibleChildren.length) {
        offset = rowMaxCount - visibleChildren.length - 1;
      } else {
        offset = rowMaxCount - count % rowMaxCount - 1;
      }
      return screen.xxl ? offset * 6 : screen.xl ? offset * 8 : offset * 12;
    };
    // 按钮Col
    var bottonGroupCol = function bottonGroupCol() {
      return /*#__PURE__*/React.createElement(_Col, {
        key: 9999,
        span: 8,
        xxl: 6,
        xl: 8,
        lg: 12,
        md: 12,
        xs: 12,
        offset: calcBottonGroupOffset(),
        style: {
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(_Space, {
        size: 10,
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }
      }, buttons !== null && buttons !== void 0 ? buttons : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Button, {
        type: 'primary',
        htmlType: 'submit',
        loading: loading,
        onClick: function onClick(e) {
          e.preventDefault();
          if (onSearch) {
            onSearch();
          } else {
            var _props$form;
            props === null || props === void 0 ? void 0 : (_props$form = props.form) === null || _props$form === void 0 ? void 0 : _props$form.submit();
          }
        }
      }, "\u67E5\u8BE2"), /*#__PURE__*/React.createElement(_Button, {
        onClick: function onClick() {
          if (onReset) {
            onReset();
          } else {
            var _props$form2, _props$form3;
            props === null || props === void 0 ? void 0 : (_props$form2 = props.form) === null || _props$form2 === void 0 ? void 0 : _props$form2.resetFields();
            if (isQueryAfterReset) props === null || props === void 0 ? void 0 : (_props$form3 = props.form) === null || _props$form3 === void 0 ? void 0 : _props$form3.submit();
          }
        }
      }, "\u91CD\u7F6E")), showExpandBtn && /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          setIsExpanded(!isExpanded);
          if (onExpend) onExpend(!isExpanded);
        },
        className: 'expandButton'
      }, !isExpanded ? "\u5C55\u5F00" : "\u6536\u8D77", /*#__PURE__*/React.createElement(DownOutlined, {
        className: !isExpanded ? 'downIcon' : 'upIcon'
      }))));
    };
    visibleChildrenCols.push(bottonGroupCol());
    return [].concat(_toConsumableArray(hiddenChildren), _toConsumableArray(visibleChildrenCols));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, isExpanded, loading, onExpend, onReset, onSearch, rowMaxCount, screen.xl, screen.xxl]);
  return /*#__PURE__*/React.createElement(_Form, _objectSpread(_objectSpread({
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  }, props), {}, {
    className: "xp-mqi-search-form ".concat((props === null || props === void 0 ? void 0 : props.className) || ''),
    style: _objectSpread({
      background: '#fff',
      padding: '16px 0 0',
      marginBottom: 12,
      borderRadius: 4
    }, props.style)
  }), /*#__PURE__*/React.createElement(_Row, null, formChildren));
};
export default /*#__PURE__*/React.memo(XpSearchForm);