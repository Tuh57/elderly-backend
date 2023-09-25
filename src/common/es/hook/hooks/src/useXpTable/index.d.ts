import type { FormInstance } from 'antd';
import type { ResultType } from '../types/common';
interface PageFieldConfig {
    page?: string;
    size?: string;
    count?: string;
}
/**
 * 与XpTable配合使用的hook
 */
interface OptionType {
    manual?: boolean;
    form?: FormInstance;
    formatFormData?: (param: any) => any;
    formatResult?: (res: ResultType) => ResultType;
    pageFieldConfig?: PageFieldConfig;
    defaultPageSize?: number;
}
/**
 * 传参类型
 * 使用表单 + 分页
 * const { tableProps, search } = useXpTable((req) => request({ ...req, sort}), { form })
 */
declare const useXpTable: (request: (data?: any) => Promise<ResultType>, option?: OptionType) => {
    tableProps: {
        loading: boolean;
        dataSource: any[];
        pagination: {
            current: number;
            pageSize: number;
            total: number | undefined;
            onChange: (page: number, pageSize?: number) => void;
        };
    };
    search: {
        submit: (config?: {
            page?: number;
            size?: number;
        }) => Promise<void>;
        reset: () => void;
    };
    param: any;
    setDataSource: import("react").Dispatch<import("react").SetStateAction<any[]>>;
};
export default useXpTable;
