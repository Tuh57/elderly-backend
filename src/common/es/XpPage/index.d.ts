import React from 'react';
import type { ReactNode } from 'react';
import './index.less';
interface Props {
    /**
     * @description 组件内元素，会默认加上16px的左右padding 来抵消基座边距
     */
    children: ReactNode;
    /**
     * @description 组件padding值，防止基座更新样式
     */
    pagePadding?: number;
    /**
     * @description 自定义类名，增加或覆盖样式
     */
    pageClassName?: string;
}
declare const _default: React.MemoExoticComponent<({ children, pagePadding, pageClassName }: Props) => React.JSX.Element>;
export default _default;
