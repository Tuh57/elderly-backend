function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useRef, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
var TableSetting = function TableSetting(_ref) {
  var columns = _ref.columns,
    setCustomColumns = _ref.setCustomColumns,
    onColumnChange = _ref.onColumnChange;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    colDataSource = _useState2[0],
    setColDataSource = _useState2[1];
  var topList = useRef([]);
  var bottomList = useRef([]);
  useEffect(function () {
    // 把传入的columns根据fixed区分开
    var newColDataSource = [];
    var newTopList = [];
    var newBottomList = [];
    columns === null || columns === void 0 ? void 0 : columns.forEach(function (item) {
      if ((item === null || item === void 0 ? void 0 : item.fixed) === 'left') {
        newTopList.push(item);
      } else if ((item === null || item === void 0 ? void 0 : item.fixed) === 'right') {
        newBottomList.push(item);
      } else {
        newColDataSource.push(item);
      }
    });
    topList.current = newTopList;
    bottomList.current = newBottomList;
    setColDataSource(newColDataSource);
  }, [columns]);
  var DragHandle = SortableHandle(function () {
    return /*#__PURE__*/React.createElement(MenuOutlined, {
      className: 'xp-mqi-table-DragHandle',
      style: {}
    });
  });
  var SortableItem = SortableElement(function (props) {
    return /*#__PURE__*/React.createElement("tr", _objectSpread({}, props));
  });
  var SortableBody = SortableContainer(function (props) {
    return /*#__PURE__*/React.createElement("tbody", _objectSpread({}, props));
  });
  var onSortEnd = function onSortEnd(_ref2) {
    var oldIndex = _ref2.oldIndex,
      newIndex = _ref2.newIndex;
    if (oldIndex !== newIndex) {
      var _cols = _toConsumableArray(colDataSource);
      var newCols = arrayMoveImmutable([].concat(_cols), oldIndex, newIndex).filter(function (el) {
        return !!el;
      });
      // 将列重新排序，回显到外层的table
      setColDataSource(newCols);
      setCustomColumns([].concat(_toConsumableArray(topList.current), _toConsumableArray(newCols), _toConsumableArray(bottomList.current)));
      // 将最新的columns透传出去
      if (onColumnChange) onColumnChange([].concat(_toConsumableArray(topList.current), _toConsumableArray(newCols), _toConsumableArray(bottomList.current)));
    }
  };
  var DraggableContainer = function DraggableContainer(props) {
    return /*#__PURE__*/React.createElement(SortableBody, _objectSpread({
      useDragHandle: true,
      disableAutoscroll: true,
      onSortEnd: onSortEnd,
      helperClass: 'xp-mqi-table-drag-row xp-mqi-table-setting-drag-row'
    }, props));
  };
  var DraggableBodyRow = function DraggableBodyRow(_ref3) {
    var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
    var index = colDataSource.findIndex(function (x) {
      return x.dataIndex === props['data-row-key'];
    });
    return /*#__PURE__*/React.createElement(SortableItem, _objectSpread({
      index: index
    }, props));
  };
  var toggleShow = function toggleShow(e, dataIndex) {
    var newCols = _toConsumableArray(colDataSource);
    var index = newCols.findIndex(function (item) {
      return item.dataIndex === dataIndex;
    });
    newCols[index].show = e.target.checked;
    setColDataSource(newCols);
    setCustomColumns([].concat(_toConsumableArray(topList.current), _toConsumableArray(newCols), _toConsumableArray(bottomList.current)));
    // 将最新的columns透传出去
    if (onColumnChange) onColumnChange([].concat(_toConsumableArray(topList.current), _toConsumableArray(newCols), _toConsumableArray(bottomList.current)));
  };
  var cols = [{
    title: '显示',
    width: 60,
    dataIndex: 'show',
    align: 'center',
    render: function render(text, record) {
      return /*#__PURE__*/React.createElement(_Checkbox, {
        checked: text,
        onChange: function onChange(e) {
          toggleShow(e, record.dataIndex);
        }
      });
    }
  }, {
    title: '列名称',
    dataIndex: 'title',
    render: function render(value) {
      return /*#__PURE__*/React.createElement(_Typography.Text, {
        ellipsis: {
          tooltip: value
        },
        style: {
          maxWidth: 130,
          margin: 'unset'
        }
      }, value);
    }
  }, {
    title: '拖动排序',
    dataIndex: 'sort',
    align: 'center',
    width: 90,
    render: function render() {
      return /*#__PURE__*/React.createElement(DragHandle, null);
    }
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320
    }
  }, /*#__PURE__*/React.createElement(_Table, {
    bordered: true,
    childrenColumnName: 'no_show_children',
    rowKey: 'dataIndex',
    className: 'xp-mqi-table',
    dataSource: colDataSource,
    scroll: {
      x: 'max-content',
      y: 400
    },
    columns: cols,
    pagination: false,
    components: {
      body: {
        wrapper: DraggableContainer,
        row: DraggableBodyRow
      }
    }
  }));
};
export default TableSetting;