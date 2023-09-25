/// <reference types="react" />
import type { FormInstance, FormItemProps } from 'antd';
import type { XpTableProps } from '../XpTable';
export type XpEditableRefType = {
    data: readonly any[];
    refreshData: (newData?: any) => void;
    isEditing: boolean;
    validateForms: () => Promise<any>;
};
export type ExpandColumnType = {
    /**
     * @description     是否可编辑
     */
    editable?: boolean;
    editCellConfig?: {
        /**
         * @description     表单render的dom
         */
        editRender?: (text?: any, record?: any, index?: number, form?: FormInstance) => React.ReactNode;
        /**
         * @description     表单配置
         */
        formItemProps?: FormItemProps;
        isEditAfterSave?: boolean;
    };
};
interface XpEditableConfig {
    /**
     * @description       表格模式 default 为默认，always为实时保存的编辑表格
     * @default           'default'
     */
    mode?: 'default' | 'always';
    /**
     * @description       是否支持多行编辑
     * @default           true
     */
    multiple?: boolean;
    /**
     * @description       表格数据保存、删除后的回调
     */
    onChange?: (dataSource: any[], key: React.Key) => void;
    /**
     * @description       行保存的回调
     */
    onRowSave?: (rowData: any, key: React.Key | string) => void;
    /**
     * @description       行删除的回调
     */
    onRowDelete?: (key: React.Key | string) => void;
    /**
     * @description       最大的行数，到达最大行数新建按钮会自动消失
     */
    maxLength?: number;
}
export interface XpEditableProps extends XpTableProps<ExpandColumnType> {
    /**
     * @description       编辑表格的配置项
     */
    editConfig?: XpEditableConfig;
    addRowProps?: {
        defaultData?: any;
        handleAddRow?: (addRow: (rowData?: object) => void) => void;
    };
}
export {};
