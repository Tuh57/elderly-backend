import React from 'react';
var defaultFun = function defaultFun() {};
export var EditableContext = /*#__PURE__*/React.createContext({
  dataSource: [],
  editingKeys: [],
  handleDelete: defaultFun,
  handleSave: defaultFun,
  handleEdit: defaultFun,
  handleCancel: defaultFun,
  alwaysSaveData: defaultFun,
  multiple: true,
  mode: 'default'
});
export var EditableRowContext = /*#__PURE__*/React.createContext({
  form: {},
  rowId: ''
});