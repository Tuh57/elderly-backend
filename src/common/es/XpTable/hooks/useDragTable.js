var _excluded = ["onMouseEnter", "onMouseLeave"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React, { useCallback, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
var useDragTable = function useDragTable(_ref) {
  var dataSource = _ref.dataSource,
    dragConfig = _ref.dragConfig;
  // 如果没有配置项 不走下面逻辑
  var _ref2 = dragConfig || {},
    dragSortKey = _ref2.dragSortKey,
    onDragSortEnd = _ref2.onDragSortEnd;
  var SortableItem = useMemo(function () {
    return SortableElement(function (props) {
      return /*#__PURE__*/React.createElement("tr", _objectSpread({}, props));
    });
  }, []);
  var SortableBody = useMemo(function () {
    return SortableContainer(function (props) {
      return /*#__PURE__*/React.createElement("tbody", _objectSpread({}, props));
    });
  }, []);
  var SortableCell = useCallback(function (_ref3) {
    var onMouseEnter = _ref3.onMouseEnter,
      onMouseLeave = _ref3.onMouseLeave,
      restProps = _objectWithoutProperties(_ref3, _excluded);
    // onMouseEnter, onMouseLeave在数据量多的时候，会严重阻塞表格单元格渲染，严重影响性能
    return /*#__PURE__*/React.createElement("td", _objectSpread({}, restProps));
  }, []);
  var DraggableContainer = useCallback(function (props) {
    return /*#__PURE__*/React.createElement(SortableBody, _objectSpread({
      useDragHandle: true,
      disableAutoscroll: true,
      onSortEnd: onDragSortEnd,
      helperClass: 'xp-mqi-table-drag-row'
    }, props));
  }, [SortableBody, onDragSortEnd]);
  var DraggableBodyRow = useCallback(function (_ref4) {
    var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
    var index = dataSource.findIndex(function (x) {
      return x[dragSortKey || 'id'] === props['data-row-key'];
    });
    return /*#__PURE__*/React.createElement(SortableItem, _objectSpread({
      index: index
    }, props));
  }, [SortableItem, dataSource, dragSortKey]);
  var dragComponents = useMemo(function () {
    return {
      body: {
        wrapper: DraggableContainer,
        row: DraggableBodyRow,
        cell: SortableCell
      }
    };
  }, [DraggableBodyRow, DraggableContainer, SortableCell]);
  if (!dragConfig) return {};
  return {
    dragComponents: dragComponents
  };
};
export default useDragTable;