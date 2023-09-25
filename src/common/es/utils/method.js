import moment from 'moment';
/**
 * 传入value和format，根据value的类型转为moment
 */
export var getMomentValue = function getMomentValue(value, format) {
  if (moment.isMoment(value)) return value;
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  return moment(value, format);
};