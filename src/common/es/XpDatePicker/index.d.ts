import XpDatePicker, { RangePicker } from './XpDatePicker';
type MergedDatePickerType = typeof XpDatePicker & {
    RangePicker: typeof RangePicker;
};
declare const MergedDatePicker: MergedDatePickerType;
export default MergedDatePicker;
