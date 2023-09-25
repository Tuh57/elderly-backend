function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/input/style";
import _Input from "antd/es/input";
var _excluded = ["editing", "editRender", "formItemProps", "dataIndex", "title", "record", "rowIndex", "children", "isEditAfterSave", "onMouseEnter", "onMouseLeave"];
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
import React, { useContext } from 'react';
import { EditableContext, EditableRowContext } from '../context';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
var EditableCell = function EditableCell(_ref) {
  var editing = _ref.editing,
    _ref$editRender = _ref.editRender,
    editRender = _ref$editRender === void 0 ? function () {
      return /*#__PURE__*/React.createElement(_Input, {
        style: {
          width: '100%'
        }
      });
    } : _ref$editRender,
    formItemProps = _ref.formItemProps,
    dataIndex = _ref.dataIndex,
    title = _ref.title,
    record = _ref.record,
    rowIndex = _ref.rowIndex,
    children = _ref.children,
    _ref$isEditAfterSave = _ref.isEditAfterSave,
    isEditAfterSave = _ref$isEditAfterSave === void 0 ? false : _ref$isEditAfterSave,
    onMouseEnter = _ref.onMouseEnter,
    onMouseLeave = _ref.onMouseLeave,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useContext = useContext(EditableContext),
    alwaysSaveData = _useContext.alwaysSaveData;
  var _useContext2 = useContext(EditableRowContext),
    rowId = _useContext2.rowId,
    form = _useContext2.form;
  var debounceSave = debounce(alwaysSaveData, 300);
  var name = (formItemProps === null || formItemProps === void 0 ? void 0 : formItemProps.name) || dataIndex;
  // 性能优化，减少表格render次数
  var oldValue = record === null || record === void 0 ? void 0 : record[name];
  return /*#__PURE__*/React.createElement("td", _objectSpread({}, restProps), editing ? /*#__PURE__*/React.createElement(_Form.Item, _objectSpread(_objectSpread({}, formItemProps), {}, {
    rules: [{
      validator: function validator(rules, value) {
        if (isEditAfterSave) {
          if (!isEqual(oldValue, value)) {
            oldValue = value;
            debounceSave(_objectSpread(_objectSpread({}, record), {}, _defineProperty({}, name, value)), rowId);
          }
        }
        return Promise.resolve();
      }
    }].concat(_toConsumableArray((formItemProps === null || formItemProps === void 0 ? void 0 : formItemProps.rules) || [])),
    name: name,
    style: _objectSpread({
      margin: 0
    }, formItemProps === null || formItemProps === void 0 ? void 0 : formItemProps.style)
  }), editRender(record[name], record, rowIndex, form)) : children);
};
export default EditableCell;