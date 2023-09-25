import type { TableProps } from 'antd';
declare const useRowSelection: (tableBatchRender: any, openRowSelection: boolean, rowSelection: TableProps<any>['rowSelection'], rowKey: TableProps<any>['rowKey'], dataSource: TableProps<any>['dataSource']) => {
    selectKeys: any[];
    selectedRowsRef: import("react").MutableRefObject<any>;
    rowSelectChange: (selectedRowKeys: any[], selectedRows: any[]) => void;
    cleanSelected: () => void;
    selectAll: () => void;
    selectRows: (event: import("react").Key[] | ((oldKey: React.Key) => any)) => void;
};
export default useRowSelection;
