import moment from 'moment';
/**
 * 传入value和format，根据value的类型转为moment
 */
export declare const getMomentValue: (value: string | moment.Moment | null | undefined, format: string) => moment.Moment | null | undefined;
