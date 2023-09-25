import React from 'react';
import type { ReactNode } from 'react';
import type { ModalProps } from 'antd';
import './index.less';
export interface XpModalProps extends ModalProps {
    children: ReactNode | ReactNode[];
    /**
     * @default false
     * @description 弹窗是否支持拖拽
     */
    isDrag?: boolean;
    /**
     * @default false
     * @description 弹窗加载的loading
     */
    modalLoading?: boolean;
}
declare const _default: React.MemoExoticComponent<({ children, modalLoading, isDrag, modalRender, ...restProps }: XpModalProps) => React.JSX.Element>;
export default _default;
