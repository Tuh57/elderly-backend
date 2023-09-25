function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/button/style";
import _Button from "antd/es/button";
var _excluded = ["editConfig", "columns", "dataSource"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import XpTable from '../XpTable';
import EditableCell from './components/EditableCell';
import EditableRow from './components/EditableRow';
import { EditableContext } from './context';
import { EditBtn, DeleteBtn, SaveBtn, CancelBtn } from './components/actionBtn';
import { useFormValidate, useEditableState } from './hooks';
import isNumber from 'lodash/isNumber';
import "./index.css";
var XpEditTable = /*#__PURE__*/forwardRef(function (props, ref) {
  var editConfig = props.editConfig,
    columns = props.columns,
    dataSource = props.dataSource,
    restProps = _objectWithoutProperties(props, _excluded);
  var _ref = editConfig || {},
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? true : _ref$multiple,
    maxLength = _ref.maxLength,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode;
  // 表单校验hook
  var _useFormValidate = useFormValidate(),
    addValidate = _useFormValidate.addValidate,
    removeValidate = _useFormValidate.removeValidate,
    validateForms = _useFormValidate.validateForms;
  // 编辑表格的状态及函数
  var _useEditableState = useEditableState(props),
    data = _useEditableState.data,
    setData = _useEditableState.setData,
    addData = _useEditableState.addData,
    setAddData = _useEditableState.setAddData,
    editingKeys = _useEditableState.editingKeys,
    setEditingKeys = _useEditableState.setEditingKeys,
    handleEdit = _useEditableState.handleEdit,
    handleCancel = _useEditableState.handleCancel,
    handleSave = _useEditableState.handleSave,
    handleDelete = _useEditableState.handleDelete,
    addRow = _useEditableState.addRow,
    alwaysSaveData = _useEditableState.alwaysSaveData;
  // 判断当前行是否处于编辑状态
  var isEditable = useCallback(function (record) {
    return editingKeys.includes(record === null || record === void 0 ? void 0 : record.id);
  }, [editingKeys]);
  var editColumns = useMemo(function () {
    return columns === null || columns === void 0 ? void 0 : columns.map(function (col) {
      if (!(col === null || col === void 0 ? void 0 : col.editable) && !(col === null || col === void 0 ? void 0 : col.editCellConfig)) {
        return _objectSpread({
          shouldCellUpdate: function shouldCellUpdate() {
            return true;
          }
        }, col);
      }
      return _objectSpread(_objectSpread({
        shouldCellUpdate: function shouldCellUpdate() {
          return true;
        }
      }, col), {}, {
        onCell: function onCell(record, rowIndex) {
          return _objectSpread(_objectSpread({
            record: record,
            rowIndex: rowIndex,
            dataIndex: col.dataIndex,
            title: col.title
          }, col.editCellConfig), {}, {
            editing: isEditable(record)
          });
        }
      });
    });
  }, [columns, isEditable]);
  var actionCol = {
    title: '操作',
    dataIndex: 'edit_action',
    width: 60,
    shouldCellUpdate: function shouldCellUpdate() {
      return true;
    },
    render: function render(text, record) {
      var editing = isEditable(record);
      if (mode === 'always') {
        return /*#__PURE__*/React.createElement(DeleteBtn, {
          id: record === null || record === void 0 ? void 0 : record.id
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, editing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SaveBtn, {
        id: record === null || record === void 0 ? void 0 : record.id,
        isAdd: record === null || record === void 0 ? void 0 : record.isEditableAdd
      }), /*#__PURE__*/React.createElement(CancelBtn, {
        id: record === null || record === void 0 ? void 0 : record.id,
        isAdd: record === null || record === void 0 ? void 0 : record.isEditableAdd
      })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EditBtn, {
        id: record === null || record === void 0 ? void 0 : record.id
      }), /*#__PURE__*/React.createElement(DeleteBtn, {
        id: record === null || record === void 0 ? void 0 : record.id
      })));
    }
  };
  // 根据传入的值刷新表格
  var refreshData = useCallback(function (newData) {
    var newDataSource = newData || [];
    // 设置默认编辑行
    if (mode === 'always') {
      var keys = newDataSource === null || newDataSource === void 0 ? void 0 : newDataSource.map(function (item) {
        return item.id;
      });
      setEditingKeys(keys);
    } else {
      setEditingKeys([]);
    }
    setAddData([]);
    setData(newData || []);
  }, []);
  // 判断默认状态下是否有处于编辑状态的行
  var isEditing = editingKeys.length > 0;
  // 抛出一些数据 外部可以用ref访问组件内部数据
  useImperativeHandle(ref, function () {
    return {
      data: data,
      isEditing: isEditing,
      refreshData: refreshData,
      validateForms: validateForms
    };
  }, [data, refreshData, isEditing, validateForms]);
  useEffect(function () {
    // 同步数组
    if (dataSource && dataSource.length >= 0) {
      setData(dataSource);
    }
    // 设置默认编辑行
    if (mode === 'always') {
      var keys = dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item) {
        return item.id;
      });
      setEditingKeys(keys || []);
    } else {
      setEditingKeys([]);
    }
  }, [dataSource]);
  var addBtn = useMemo(function () {
    // 有maxLength切大于0则限制行数 没有就不限制
    if (isNumber(maxLength) && maxLength > 0) {
      if (Number(maxLength) > data.length + addData.length) {
        return /*#__PURE__*/React.createElement(_Button, {
          className: 'xp-mqi-editable-add-row',
          icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
          onClick: function onClick() {
            return addRow();
          }
        }, "\u6DFB\u52A0\u4E00\u884C");
      } else {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }
    }
    return /*#__PURE__*/React.createElement(_Button, {
      className: 'xp-mqi-editable-add-row',
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
      onClick: function onClick() {
        return addRow();
      }
    }, "\u6DFB\u52A0\u4E00\u884C");
  }, [addRow, addData.length, data.length, maxLength]);
  return /*#__PURE__*/React.createElement(EditableContext.Provider, {
    value: {
      dataSource: [].concat(_toConsumableArray(data), _toConsumableArray(addData)),
      editingKeys: editingKeys,
      handleEdit: handleEdit,
      handleDelete: handleDelete,
      handleCancel: handleCancel,
      handleSave: handleSave,
      multiple: multiple,
      alwaysSaveData: alwaysSaveData,
      mode: mode
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'xp-mqi-editable'
  }, /*#__PURE__*/React.createElement(XpTable, _objectSpread(_objectSpread({
    toolbarShowSetting: false
  }, restProps), {}, {
    rowKey: 'id',
    components: {
      body: {
        cell: EditableCell,
        row: EditableRow
      }
    },
    columns: [].concat(_toConsumableArray(editColumns), [actionCol]),
    dataSource: [].concat(_toConsumableArray(data), _toConsumableArray(addData)),
    onRow: function onRow(record, index) {
      return {
        record: record,
        index: index,
        addValidate: addValidate,
        removeValidate: removeValidate
      };
    },
    pagination: false
  })), addBtn));
});
export default XpEditTable;