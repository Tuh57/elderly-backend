// 获取元素和视窗的距离
export const getOffset = (node: Element) => {
  const box = node?.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - (docElem.clientTop || document.body.clientTop || 0),
    bottom: box.bottom + window.pageYOffset - (docElem.clientTop || document.body.clientTop || 0)
  };
};
