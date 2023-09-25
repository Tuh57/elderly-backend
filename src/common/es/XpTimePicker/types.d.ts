import type { TimePickerProps, TimeRangePickerProps } from 'antd';
import type { Moment } from 'moment';
type EventValue<DataType = Moment> = DataType | null;
export type XpTimePickerProps = TimePickerProps & {
    /**
     * @description 时间字符默认值，相当于defaultValue
     */
    defaultTime?: string;
    /**
     * @description 时间字符默认值，相当于value, 优先级更高
     */
    time?: string;
    /**
     * @description 时间字符传发生变化的回调
     */
    onTimeChange?: (time: string) => void;
};
export type XpTimeRangePickerProps = TimeRangePickerProps & {
    /**
     * @description 时间字符默认值，相当于defaultValue, 优先级更高
     */
    defaultTime?: [EventValue<string>, EventValue<string>];
    /**
     * @description 时间字符默认值，相当于value, 优先级更高
     */
    time?: [EventValue<string>, EventValue<string>];
    /**
     * @description 时间字符传发生变化的回调
     */
    onTimeChange?: (time: [EventValue<string>, EventValue<string>]) => void;
};
export {};
