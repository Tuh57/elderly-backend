import { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { getOffset } from '../utils/method';
import { unstable_batchedUpdates } from 'react-dom';
import type { TableProps } from 'antd';

const useStickyPagination = (
  tableRef: React.MutableRefObject<HTMLDivElement | null>,
  container: any,
  dataSource: TableProps<any>['dataSource']
) => {
  // 滚动事件 用于分页器设置粘性定位
  const onScroll = () => {
    if (!tableRef.current?.clientWidth) {
      return;
    }
    // 容器底距离顶部距离
    const containerOffsetTop =
      container === window
        ? document.documentElement.scrollTop + window.innerHeight
        : getOffset(container as Element).top + (container as Element).clientHeight;
    const tableBodyDom = tableRef.current?.querySelector('.ant-table-body') as HTMLElement;
    const paginationDom = tableRef.current?.querySelector('.ant-pagination') as HTMLElement;
    if (!paginationDom || !tableBodyDom) return;

    // 元素距离顶部距离 9是修正值，使分页器与虚拟滚动条同步显示隐藏
    const tableOffsetTop = getOffset(tableBodyDom).top + paginationDom.clientHeight;
    const tableBottomOffsetTop = getOffset(tableBodyDom).top + tableBodyDom.clientHeight - 9;

    if (tableOffsetTop >= containerOffsetTop || tableBottomOffsetTop <= containerOffsetTop) {
      paginationDom.style.position = 'unset';
    } else {
      paginationDom.style.position = 'sticky';
    }
  };

  const onContainerScroll = unstable_batchedUpdates
    ? function () {
        unstable_batchedUpdates(onScroll);
      }
    : throttle(onScroll, 100);

  useEffect(() => {
    container.addEventListener('scroll', onContainerScroll, false);
    return () => {
      container.removeEventListener('scroll', onContainerScroll);
    };
  }, [container]);

  useEffect(() => {
    onContainerScroll();
  }, [dataSource]);

  return { onContainerScroll };
};

export default useStickyPagination;
