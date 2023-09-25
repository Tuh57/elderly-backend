import type { TableProps } from 'antd';
declare const useStickyPagination: (tableRef: React.MutableRefObject<HTMLDivElement | null>, container: any, dataSource: TableProps<any>['dataSource']) => {
    onContainerScroll: () => void;
};
export default useStickyPagination;
