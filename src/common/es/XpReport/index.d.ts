import React from 'react';
import type { XpReportRef } from './type';
import './index.less';
interface XpReportProps {
    /**
     * @description 报表初始化请求
     */
    getLeopardUrlReq: any;
    /**
     * @description 用户名 这里useId传同样参数
     * @default 'pengfd'
     */
    username?: string;
    /**
     * @description 报表初始化请求的额外参数
     */
    globalParam?: any;
    /**
     * @description 报表容器高度
     */
    height?: React.CSSProperties['height'];
    /**
     * @description 是否展示全屏按钮，可传入对象进行配置
     * @default true
     */
    fullScreen?: {
        fullScreenStyle?: React.CSSProperties;
        OpenFullScreenImg?: React.ReactNode;
        CloseFullScreenImg?: React.ReactNode;
    };
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<XpReportProps & React.RefAttributes<XpReportRef>>>;
export default _default;
