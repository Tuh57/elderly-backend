import React from 'react';
import type { FormInstance } from 'antd';
export interface EditableContextType {
    dataSource: readonly any[];
    handleDelete: (key: React.Key, isAdd?: boolean) => void;
    handleEdit: (key: React.Key) => void;
    handleSave: (rowData: any, key: React.Key, isAdd?: boolean) => void;
    handleCancel: (key: React.Key) => void;
    multiple?: boolean;
    editingKeys: React.Key[];
    alwaysSaveData: (rowData: any[], key: React.Key) => void;
    mode?: 'default' | 'always';
}
export declare const EditableContext: React.Context<EditableContextType>;
export interface EditableRowContextType {
    form: FormInstance;
    rowId: string;
}
export declare const EditableRowContext: React.Context<EditableRowContextType>;
