// 获取元素和视窗的距离
export var getOffset = function getOffset(node) {
  var box = node === null || node === void 0 ? void 0 : node.getBoundingClientRect();
  var docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - (docElem.clientTop || document.body.clientTop || 0),
    bottom: box.bottom + window.pageYOffset - (docElem.clientTop || document.body.clientTop || 0)
  };
};