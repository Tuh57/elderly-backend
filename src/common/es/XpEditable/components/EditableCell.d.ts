import React from 'react';
import type { FormItemProps, FormInstance } from 'antd';
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * @description     该单元格是否处于编辑状态
     */
    editing: boolean;
    /**
     * @default         () => <Input style={{ width: '100%' }} />
     * @description     编辑状态下渲染的表单节点
     */
    editRender?: (text?: any, record?: any, index?: number, form?: FormInstance) => React.ReactNode;
    /**
     * @description     单元格的FormItem配置
     */
    formItemProps?: FormItemProps;
    isEditAfterSave?: boolean;
    dataIndex: string;
    title: any;
    record: any;
    rowIndex: number;
    children: React.ReactNode;
}
declare const EditableCell: ({ editing, editRender, formItemProps, dataIndex, title, record, rowIndex, children, isEditAfterSave, onMouseEnter, onMouseLeave, ...restProps }: EditableCellProps) => React.JSX.Element;
export default EditableCell;
