import type { DatePickerProps } from 'antd';
import type { Moment } from 'moment';
export type EventValue<DataType = Moment> = DataType | null;
export type XpDatePickerProps = DatePickerProps & {
    /**
     * @description 组件传递的value字符的时间格式，设置会同步到format，内部根据picker设置了一些默认值
     * @default 'YYYY-MM-DD'
     */
    valueFormat?: string;
    /**
     * @description 日期字符串，相当于value，支持传入string
     */
    date?: string;
    /**
     * @description 日期字符默认值，相当于defaultValue，支持传入string
     */
    defaultDate?: string;
    /**
     * @description 日期字符串发生变化的回调
     */
    onDateChange?: (date: string) => void;
};
import type { RangePickerProps } from 'antd/lib/date-picker';
export type XpRangePickerProps = RangePickerProps & {
    /**
     * @description 组件传递的value字符的时间格式，设置会同步到format，内部根据picker设置了一些默认值
     * @default 'YYYY-MM-DD'
     */
    valueFormat?: string;
    /**
     * @description 日期字符串，相当于value，支持传入[string, string]
     */
    date?: [EventValue<string>, EventValue<string>];
    /**
     * @description 日期字符默认值，相当于defaultValue，支持传入[string, string]
     */
    defaultDate?: [EventValue<string>, EventValue<string>];
    /**
     * @description 日期字符串发生变化的回调
     */
    onDateChange?: (date: [EventValue<string>, EventValue<string>]) => void;
};
