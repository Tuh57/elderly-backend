import { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { getOffset } from '../utils/method';
import { unstable_batchedUpdates } from 'react-dom';
var useStickyPagination = function useStickyPagination(tableRef, container, dataSource) {
  // 滚动事件 用于分页器设置粘性定位
  var onScroll = function onScroll() {
    var _tableRef$current, _tableRef$current2, _tableRef$current3;
    if (!((_tableRef$current = tableRef.current) === null || _tableRef$current === void 0 ? void 0 : _tableRef$current.clientWidth)) {
      return;
    }
    // 容器底距离顶部距离
    var containerOffsetTop = container === window ? document.documentElement.scrollTop + window.innerHeight : getOffset(container).top + container.clientHeight;
    var tableBodyDom = (_tableRef$current2 = tableRef.current) === null || _tableRef$current2 === void 0 ? void 0 : _tableRef$current2.querySelector('.ant-table-body');
    var paginationDom = (_tableRef$current3 = tableRef.current) === null || _tableRef$current3 === void 0 ? void 0 : _tableRef$current3.querySelector('.ant-pagination');
    if (!paginationDom || !tableBodyDom) return;
    // 元素距离顶部距离 9是修正值，使分页器与虚拟滚动条同步显示隐藏
    var tableOffsetTop = getOffset(tableBodyDom).top + paginationDom.clientHeight;
    var tableBottomOffsetTop = getOffset(tableBodyDom).top + tableBodyDom.clientHeight - 9;
    if (tableOffsetTop >= containerOffsetTop || tableBottomOffsetTop <= containerOffsetTop) {
      paginationDom.style.position = 'unset';
    } else {
      paginationDom.style.position = 'sticky';
    }
  };
  var onContainerScroll = unstable_batchedUpdates ? function () {
    unstable_batchedUpdates(onScroll);
  } : throttle(onScroll, 100);
  useEffect(function () {
    container.addEventListener('scroll', onContainerScroll, false);
    return function () {
      container.removeEventListener('scroll', onContainerScroll);
    };
  }, [container]);
  useEffect(function () {
    onContainerScroll();
  }, [dataSource]);
  return {
    onContainerScroll: onContainerScroll
  };
};
export default useStickyPagination;