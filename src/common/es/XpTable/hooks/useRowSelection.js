function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useState, useCallback, useRef, useEffect } from 'react';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
var useRowSelection = function useRowSelection(
// 这两个作为开关
tableBatchRender, openRowSelection,
// 函数需要用到的
rowSelection, rowKey, dataSource) {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    selectKeys = _useState2[0],
    setSelectKeys = _useState2[1];
  var selectedRowsRef = useRef();
  // 勾选change
  var rowSelectChange = function rowSelectChange(selectedRowKeys, selectedRows) {
    setSelectKeys(selectedRowKeys);
    selectedRowsRef.current = selectedRows;
    if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows);
    }
  };
  // 清空勾选
  var cleanSelected = useCallback(function () {
    setSelectKeys([]);
    if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange) {
      rowSelection.onChange([], []);
    }
    if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelectNone) {
      rowSelection.onSelectNone();
    }
  }, [rowSelection]);
  // 根据rowKey获取每一行的'key'
  var getRowKey = function getRowKey(record, index) {
    var key;
    if (isFunction(rowKey)) {
      key = rowKey(record, index);
    } else {
      var newRowKey = isString(rowKey) ? rowKey : 'id';
      key = record === null || record === void 0 ? void 0 : record[newRowKey];
    }
    return key;
  };
  var selectAll = useCallback(function () {
    var keys = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (record, index) {
      return getRowKey(record, index);
    })) || [];
    setSelectKeys(keys);
  }, [dataSource]);
  var selectRows = useCallback(function (event) {
    if (typeof event === 'function') {
      var newSelectKeys = selectKeys === null || selectKeys === void 0 ? void 0 : selectKeys.filter(event);
      setSelectKeys(newSelectKeys);
    } else if (Array.isArray(event)) {
      setSelectKeys(event);
    } else {
      console.warn('selectRows事件仅支持传入数组或回调函数');
    }
  }, [selectKeys]);
  // 数据刷新则根据 key 刷新选中行
  useEffect(function () {
    if (!openRowSelection && !tableBatchRender) {
      return;
    }
    // 表格刷新时，判断keys中是否有dataSource的【id】
    if (selectKeys && selectKeys.length > 0 && dataSource) {
      var newSelectKeys = [];
      for (var i = 0; i < dataSource.length; i++) {
        var key = getRowKey(dataSource[i], i);
        var index = selectKeys.indexOf(key);
        if (index > -1) {
          newSelectKeys.push(key);
        }
      }
      setSelectKeys(newSelectKeys);
    }
  }, [dataSource]);
  return {
    selectKeys: selectKeys,
    selectedRowsRef: selectedRowsRef,
    rowSelectChange: rowSelectChange,
    cleanSelected: cleanSelected,
    selectAll: selectAll,
    selectRows: selectRows
  };
};
export default useRowSelection;