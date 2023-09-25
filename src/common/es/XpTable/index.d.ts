import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { TableProps, TableColumnType } from 'antd';
import './index.less';
export type XpTableColumnType = {
    show?: boolean;
} & TableColumnType<any>;
export interface XpTableProps<Col = any> extends TableProps<any> {
    /**
     * @description 拓展antd的ts，增加show属性
     */
    columns: (XpTableColumnType & Col)[];
    /**
     * @default true
     * @description toolbar是否显示列设置按钮
     */
    toolbarShowSetting?: boolean;
    /**
     * @description 表头发生改变的回调，columns为新的表头数组
     */
    onColumnChange?: (columns: XpTableColumnType[]) => void;
    /**
     * @description table的title
     */
    tableTitle?: string | ReactElement;
    /**
     * @description toolbar显示的按钮,传入字符串会自带样式
     */
    toolbarButton?: ReactElement<any>;
    /**
     * @description sticky挂载的节点类名，需要加 . （目前只支持弹窗内表格的拓展）
     */
    stickyClassName?: string;
    /**
     * @description 拖拽配置项 dragSortKey是拖拽的key，onDragSortEnd是拖拽完成的回调
     */
    dragConfig?: {
        dragSortKey: string;
        onDragSortEnd: ({ oldIndex, newIndex }: {
            oldIndex: number;
            newIndex: number;
        }) => void;
    };
    /**
     * @description 是否开启勾选列
     * @default false
     */
    openRowSelection?: boolean;
    /**
     * @description 表格批量操作渲染的按钮
     */
    tableBatchRender?: (selectedRowKeys: string[] | number[], selectedRows: any[], onCleanSelected: () => void) => ReactElement<any>;
    /**
     * @description 表格操作列渲染的按钮
     */
    actionRender?: (record: any, index: number) => ReactNode[];
    /**
     * @description 空数据的文案 null undefined '' 时显示
     */
    columnEmptyText?: string;
}
export interface XpTableRefType {
    selectedRowKeys?: React.Key[];
    cleanSelected?: () => void;
    rowSelection?: {
        selectedRowKeys: React.Key[];
        selectedRows: any[];
        cleanSelected: () => void;
        selectAll: () => void;
        selectRows: (event: React.Key[] | ((oldKey: React.Key) => any)) => void;
    };
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<XpTableProps<any> & React.RefAttributes<XpTableRefType>>>;
export default _default;
