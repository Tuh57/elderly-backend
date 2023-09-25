function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/message/style";
import _message from "antd/es/message";
var _excluded = ["isEditableAdd"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
import { useRef, useCallback, useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';
export var useEditableState = function useEditableState(_ref) {
  var editConfig = _ref.editConfig,
    dataSource = _ref.dataSource,
    addRowProps = _ref.addRowProps;
  var _ref2 = editConfig || {},
    _ref2$multiple = _ref2.multiple,
    multiple = _ref2$multiple === void 0 ? true : _ref2$multiple,
    onRowSave = _ref2.onRowSave,
    onChange = _ref2.onChange,
    onRowDelete = _ref2.onRowDelete,
    _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? 'default' : _ref2$mode;
  // 表格数据
  var _useState = useState(dataSource || []),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    addData = _useState4[0],
    setAddData = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    editingKeys = _useState6[0],
    setEditingKeys = _useState6[1];
  // 行进入编辑状态
  var handleEdit = useCallback(function (id) {
    if (multiple) {
      var newKeys = _toConsumableArray(editingKeys);
      newKeys.push(id);
      setEditingKeys(newKeys);
    } else {
      // 只有一行可以编辑
      setEditingKeys([id]);
    }
  }, [editingKeys]);
  // 行取消编辑状态
  var handleCancel = useCallback(function (id) {
    if (multiple) {
      var newKeys = editingKeys.filter(function (item) {
        return item !== id;
      });
      setEditingKeys(newKeys);
    } else {
      setEditingKeys([]);
    }
  }, [editingKeys]);
  // 保存
  var handleSave = useCallback(function (rowData, key, isAdd) {
    if (isAdd) {
      // 目前一次只能新增一个 但代码也做了兼容多个新增的情况
      var newData = _toConsumableArray(data);
      var newAddData = _toConsumableArray(addData);
      var isEditableAdd = rowData.isEditableAdd,
        item = _objectWithoutProperties(rowData, _excluded);
      newData.push(item);
      setAddData(newAddData.filter(function (_) {
        return _.id !== key;
      }));
      setData(newData);
      handleCancel(key);
      return;
    }
    if (onRowSave) {
      onRowSave(rowData, key);
    } else {
      var _newData = _toConsumableArray(data);
      var index = _newData.findIndex(function (item) {
        return item.id === key;
      });
      if (index > -1) {
        _newData[index] = rowData;
        setData(_newData);
        handleCancel(key);
      }
      if (onChange) {
        onChange(_newData, key);
      }
    }
  }, [addData, data, handleCancel, onChange, onRowSave]);
  // 删除行
  var handleDelete = useCallback(function (key, isAdd) {
    if (isAdd) {
      var newAddData = addData.filter(function (item) {
        return item.id !== key;
      });
      setAddData(newAddData);
      handleCancel(key);
      return;
    }
    if (onRowDelete) {
      onRowDelete(key);
    } else {
      var newData = data.filter(function (item) {
        return item.id !== key;
      });
      setData(newData);
      if (onChange) {
        onChange(newData, key);
      }
    }
  }, [addData, data, handleCancel, onChange, onRowDelete]);
  // 新增一行并默认id
  var addRow = useCallback(function (rowData) {
    var newAddData = _toConsumableArray(addData);
    if (newAddData.length > 0) {
      _message.destroy();
      _message.warn('只能新增一行，请保存后再新增。');
      return;
    }
    if (!multiple && editingKeys.length > 0) {
      _message.destroy();
      _message.warn('请先保存后再新增一行');
      return;
    }
    var newEditingKeys = _toConsumableArray(editingKeys);
    var newId = uniqueId('editable_id');
    newEditingKeys.push(newId);
    setEditingKeys(newEditingKeys);
    // 实时保存模式下 新增的数据直接存入data
    if (mode === 'always') {
      var newData = _toConsumableArray(data);
      newData.push(_objectSpread({
        id: newId
      }, rowData || (addRowProps === null || addRowProps === void 0 ? void 0 : addRowProps.defaultData)));
      setData(newData);
      return;
    }
    newAddData.push(_objectSpread({
      id: newId,
      isEditableAdd: true
    }, rowData || (addRowProps === null || addRowProps === void 0 ? void 0 : addRowProps.defaultData)));
    setAddData(newAddData);
  }, [addData, data, editingKeys]);
  var handleAdd = addRowProps && isFunction(addRowProps.handleAddRow) ? function () {
    var _addRowProps$handleAd;
    return (_addRowProps$handleAd = addRowProps.handleAddRow) === null || _addRowProps$handleAd === void 0 ? void 0 : _addRowProps$handleAd.call(addRowProps, addRow);
  } : addRow;
  // 实时保存模式下，保存数据
  var alwaysSaveData = useCallback(function (rowData, key) {
    var newData = _toConsumableArray(data);
    var index = newData.findIndex(function (item) {
      return item.id === key;
    });
    if (index > -1) {
      newData[index] = rowData;
      setData(newData);
    }
  }, [data]);
  return {
    data: data,
    setData: setData,
    addData: addData,
    setAddData: setAddData,
    editingKeys: editingKeys,
    setEditingKeys: setEditingKeys,
    handleEdit: handleEdit,
    handleCancel: handleCancel,
    handleSave: handleSave,
    handleDelete: handleDelete,
    addRow: handleAdd,
    alwaysSaveData: alwaysSaveData
  };
};
export var useFormValidate = function useFormValidate() {
  // 把每一行的校验方法存起来
  var validatesRef = useRef([]);
  // 添加一行校验方法
  var addValidate = useCallback(function (func) {
    var index = validatesRef.current.findIndex(function (f) {
      return f === func;
    });
    if (index === -1) {
      validatesRef.current.push(func);
    }
  }, []);
  // 删除一行校验方法
  var removeValidate = useCallback(function (func) {
    var index = validatesRef.current.findIndex(function (f) {
      return f === func;
    });
    if (index !== -1) {
      validatesRef.current.splice(index, 1);
    }
  }, []);
  // 校验所有行
  var validateForms = useCallback(function () {
    var _validatesRef$current;
    return Promise.all((_validatesRef$current = validatesRef.current) === null || _validatesRef$current === void 0 ? void 0 : _validatesRef$current.map(function (f) {
      return f();
    }));
  }, []);
  return {
    addValidate: addValidate,
    removeValidate: removeValidate,
    validateForms: validateForms
  };
};