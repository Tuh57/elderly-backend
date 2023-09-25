import React from 'react';
import type { FormProps } from 'antd';
import './index.less';
interface SearchFormProps extends FormProps {
    /**
     * @description       设置查询按钮加载状态
     * @default           false
     */
    loading?: boolean;
    /**
     * @description       设置最少展示几个 Col，即最少展示几个字段
     * @default           false
     */
    minCount?: number;
    /**
     * @description       表单默认展开
     * @default           false
     */
    defaultExpanded?: boolean;
    /**
     * @description       切换表单展开状态的回调
     */
    onExpend?: (isExpanded: boolean) => void;
    /**
     * @description       重置后是否查询
     * @default           false
     */
    isQueryAfterReset?: boolean;
    /**
     * @description       自定义查询按钮的回调
     */
    onSearch?: () => void;
    /**
     * @description       自定义重置按钮的回调
     */
    onReset?: () => void;
    children: React.ReactNode | React.ReactNode[];
    /**
     * @description       自定义按钮组，可以传入react节点
     */
    buttons?: React.ReactNode;
}
declare const _default: React.MemoExoticComponent<({ loading, defaultExpanded, isQueryAfterReset, minCount, onExpend, children, onSearch, onReset, buttons, ...props }: SearchFormProps) => React.JSX.Element>;
export default _default;
