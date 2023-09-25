import type { FormInstance } from 'antd';
import type { XpEditableProps } from './types';
export declare const useEditableState: ({ editConfig, dataSource, addRowProps }: XpEditableProps) => {
    data: readonly any[];
    setData: import("react").Dispatch<import("react").SetStateAction<readonly any[]>>;
    addData: any[];
    setAddData: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    editingKeys: import("react").Key[];
    setEditingKeys: import("react").Dispatch<import("react").SetStateAction<import("react").Key[]>>;
    handleEdit: (id: React.Key) => void;
    handleCancel: (id: React.Key) => void;
    handleSave: (rowData: any, key: React.Key, isAdd?: boolean) => void;
    handleDelete: (key: React.Key, isAdd?: boolean) => void;
    addRow: (rowData?: object) => void;
    alwaysSaveData: (rowData: any, key: React.Key) => void;
};
export declare const useFormValidate: () => {
    addValidate: (func: FormInstance['validateFields']) => void;
    removeValidate: (func: FormInstance['validateFields']) => void;
    validateForms: () => Promise<any[]>;
};
