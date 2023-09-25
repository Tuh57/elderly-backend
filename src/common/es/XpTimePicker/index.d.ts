import XpTimePicker, { RangePicker } from './XpTimePicker';
type MergedDatePickerType = typeof XpTimePicker & {
    RangePicker: typeof RangePicker;
};
declare const MergedDatePicker: MergedDatePickerType;
export default MergedDatePicker;
