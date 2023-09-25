import React from 'react';
import type { TimeRangePickerProps } from 'antd';
declare const XpTimePicker: React.ForwardRefExoticComponent<import("antd").TimePickerProps & {
    defaultTime?: string | undefined;
    time?: string | undefined;
    onTimeChange?: ((time: string) => void) | undefined;
} & React.RefAttributes<any>>;
export declare const RangePicker: React.ForwardRefExoticComponent<TimeRangePickerProps & {
    defaultTime?: [string | null, string | null] | undefined;
    time?: [string | null, string | null] | undefined;
    onTimeChange?: ((time: [string | null, string | null]) => void) | undefined;
} & React.RefAttributes<any>>;
export default XpTimePicker;
