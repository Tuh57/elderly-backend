function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/popover/style";
import _Popover from "antd/es/popover";
var _excluded = ["columns", "toolbarShowSetting", "onColumnChange", "tableTitle", "toolbarButton", "stickyClassName", "pagination", "dragConfig", "rowSelection", "tableBatchRender", "openRowSelection", "actionRender", "columnEmptyText"],
  _excluded2 = ["onMouseEnter", "onMouseLeave"];
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
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import TableSetting from './compontents/tableSetting';
import { useStickyPagination, useDragTable, useRowSelection } from './hooks';
import isEqual from 'lodash/isEqual';
import "./index.css";
var XpTable = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$toolbarShowSetti = _ref.toolbarShowSetting,
    toolbarShowSetting = _ref$toolbarShowSetti === void 0 ? true : _ref$toolbarShowSetti,
    onColumnChange = _ref.onColumnChange,
    tableTitle = _ref.tableTitle,
    toolbarButton = _ref.toolbarButton,
    stickyClassName = _ref.stickyClassName,
    pagination = _ref.pagination,
    dragConfig = _ref.dragConfig,
    rowSelection = _ref.rowSelection,
    tableBatchRender = _ref.tableBatchRender,
    _ref$openRowSelection = _ref.openRowSelection,
    openRowSelection = _ref$openRowSelection === void 0 ? false : _ref$openRowSelection,
    actionRender = _ref.actionRender,
    columnEmptyText = _ref.columnEmptyText,
    restProps = _objectWithoutProperties(_ref, _excluded);
  /*
   * 自定义列
   */
  var _useState = useState(columns),
    _useState2 = _slicedToArray(_useState, 2),
    customColumns = _useState2[0],
    _setCustomColumns = _useState2[1];
  var newColumns = useMemo(function () {
    /**
     * 1. 处理自定义列
     * 2. 优化表格渲染
     * 3. 处理空数据文本
     * 4. 处理编辑列
     */
    var tempColumns = _toConsumableArray(!toolbarShowSetting ? columns : customColumns.filter(function (item) {
      return item.fixed || item.show;
    })).map(function (item) {
      return item.hasOwnProperty('fixed') ? item : _objectSpread({
        shouldCellUpdate: function shouldCellUpdate(record, prevRecord) {
          return !isEqual(record, prevRecord);
        },
        render: columnEmptyText ? function (text) {
          return text != null && text !== '' ? text : columnEmptyText;
        } : undefined
      }, item);
    });
    var actionCol;
    if (actionRender && actionRender.length > 0) {
      actionCol = {
        title: '操作',
        dataIndex: 'xp_table_action',
        fixed: 'right',
        width: 60,
        render: function render(_, record, index) {
          var actionNodeList = actionRender(record, index);
          if (actionNodeList.length > 3) {
            var showNodeList = actionNodeList.slice(0, 2);
            var hiddenNodeList = actionNodeList.slice(2);
            var hiddenNode = /*#__PURE__*/React.createElement(_Popover, {
              content: hiddenNodeList.map(function (child) {
                return child;
              }),
              trigger: 'click',
              arrowPointAtCenter: true,
              placement: 'bottomRight',
              key: 'xp-table-action-popover',
              overlayClassName: 'xp-table-action-popover'
            }, /*#__PURE__*/React.createElement(_Typography.Link, null, "\xB7\xB7\xB7"));
            showNodeList.push(hiddenNode);
            return /*#__PURE__*/React.createElement("div", {
              className: 'xp-mqi-table-action-col'
            }, showNodeList.map(function (child) {
              return child;
            }));
          } else {
            return /*#__PURE__*/React.createElement("div", {
              className: 'xp-mqi-table-action-col'
            }, actionNodeList.map(function (child) {
              return child;
            }));
          }
        }
      };
    }
    if (actionCol) tempColumns.push(actionCol);
    return tempColumns;
  }, [actionRender, columns, customColumns, toolbarShowSetting]);
  useEffect(function () {
    if (toolbarShowSetting) {
      _setCustomColumns(columns);
    }
  }, [columns, toolbarShowSetting]);
  var toolbar = useMemo(function () {
    // 如果没有title、按钮，并且不显示设置按钮，则不展示toolbar
    if (!tableTitle && !toolbarButton && !toolbarShowSetting) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: 'xp-mqi-table-toolbar'
    }, typeof tableTitle === 'string' ? /*#__PURE__*/React.createElement("div", {
      className: 'xp-mqi-table-toolbar-title'
    }, tableTitle || '') : /*#__PURE__*/React.createElement("div", null, tableTitle), /*#__PURE__*/React.createElement("div", {
      className: 'xp-mqi-table-toolbar-buttons'
    }, toolbarButton || null, toolbarShowSetting && /*#__PURE__*/React.createElement(_Popover, {
      trigger: 'click',
      arrowPointAtCenter: true,
      placement: 'bottomRight',
      overlayClassName: 'xp-mqi-table-popover',
      content: /*#__PURE__*/React.createElement(TableSetting, {
        columns: columns,
        setCustomColumns: function setCustomColumns(data) {
          return _setCustomColumns(data);
        },
        onColumnChange: onColumnChange
      })
    }, /*#__PURE__*/React.createElement(_Tooltip, {
      title: "\u5217\u8BBE\u7F6E"
    }, /*#__PURE__*/React.createElement(SettingOutlined, {
      style: {
        fontSize: 16,
        cursor: 'pointer',
        marginLeft: 16
      }
    })))));
  }, [columns, onColumnChange, tableTitle, toolbarButton, toolbarShowSetting]);
  // 拖拽
  var _useDragTable = useDragTable({
      dataSource: restProps.dataSource,
      dragConfig: dragConfig
    }),
    dragComponents = _useDragTable.dragComponents;
  // 勾选批量操作
  // 勾选批量操作
  var _useRowSelection = useRowSelection(tableBatchRender, openRowSelection, rowSelection, restProps.rowKey, restProps.dataSource),
    selectKeys = _useRowSelection.selectKeys,
    selectedRowsRef = _useRowSelection.selectedRowsRef,
    rowSelectChange = _useRowSelection.rowSelectChange,
    cleanSelected = _useRowSelection.cleanSelected,
    selectAll = _useRowSelection.selectAll,
    selectRows = _useRowSelection.selectRows;
  // 抛出一些数据 外部可以用ref访问组件内部数据
  useImperativeHandle(ref, function () {
    return {
      selectedRowKeys: selectKeys,
      cleanSelected: cleanSelected,
      rowSelection: {
        selectedRowKeys: selectKeys,
        cleanSelected: cleanSelected,
        selectAll: selectAll,
        selectRows: selectRows,
        selectedRows: selectedRowsRef.current
      }
    };
  }, [selectKeys, cleanSelected, selectAll, selectRows, selectedRowsRef]);
  var rowSelectBar = useMemo(function () {
    return /*#__PURE__*/React.createElement("div", {
      className: 'xp-mqi-table-select-bar'
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        marginRight: 8
      }
    }, "\u5DF2\u9009 ", selectKeys.length, " \u9879"), /*#__PURE__*/React.createElement(_Typography.Link, {
      onClick: cleanSelected
    }, "\u53D6\u6D88\u9009\u62E9")), /*#__PURE__*/React.createElement("div", null, tableBatchRender && tableBatchRender(selectKeys, selectedRowsRef.current, cleanSelected)));
  }, [cleanSelected, selectKeys, selectedRowsRef, tableBatchRender]);
  var TableCell = useCallback(function (_ref2) {
    var onMouseEnter = _ref2.onMouseEnter,
      onMouseLeave = _ref2.onMouseLeave,
      props = _objectWithoutProperties(_ref2, _excluded2);
    // onMouseEnter, onMouseLeave在数据量多的时候，会严重阻塞表格单元格渲染，严重影响性能
    return /*#__PURE__*/React.createElement("td", _objectSpread({}, props));
  }, []);
  // 分页器吸顶
  var container = document.querySelector(stickyClassName || '.mqi-layout-container') || window;
  var tableRef = useRef(null);
  useStickyPagination(tableRef, container, restProps.dataSource);
  return /*#__PURE__*/React.createElement("div", {
    className: 'xp-mqi-table'
  }, toolbar, tableBatchRender && selectKeys.length > 0 && rowSelectBar, /*#__PURE__*/React.createElement(_Table, _objectSpread(_objectSpread({
    ref: tableRef,
    bordered: true,
    rowKey: 'id',
    columns: newColumns,
    pagination: pagination ? _objectSpread(_objectSpread({
      defaultPageSize: 20
    }, pagination), {}, {
      size: 'small',
      showSizeChanger: true,
      showTotal: function showTotal(total) {
        return "\u5171 ".concat(total, " \u6761");
      }
    }) : pagination,
    scroll: {
      x: restProps.dataSource && restProps.dataSource.length > 0 ? 'max-content' : '100%'
    }
  }, restProps), {}, {
    components: dragConfig ? dragComponents : restProps.components || {
      body: {
        cell: TableCell
      }
    },
    rowSelection: openRowSelection || tableBatchRender ? _objectSpread(_objectSpread({}, rowSelection), {}, {
      // 有tableBatchRender的时候走组件的用组件内部属性, 传入的onChange，selectedRowKeys失效
      selectedRowKeys: selectKeys,
      onChange: rowSelectChange
    }) : rowSelection,
    sticky:
    // 布尔值覆盖，对象参数则继承
    typeof restProps.sticky === 'boolean' ? restProps.sticky : _objectSpread({
      // 默认挂载在基座最外层加了overflow：auto的元素上
      getContainer: function getContainer() {
        return document.querySelector(stickyClassName || '.mqi-layout-container') || window;
      },
      offsetScroll: 54
    }, restProps.sticky)
  })));
});
export default /*#__PURE__*/React.memo(XpTable);