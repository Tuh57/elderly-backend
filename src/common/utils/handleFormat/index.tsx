import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';

type dateRangeType = (data: Record<string, any>, timer: Record<string, string[]>) => void;

type formatType = <T extends Record<string, any>>(
  data: T,
  options: {
    timeGroup?: Record<string, string[]>;
    timeGroupMs?: Record<string, string[]>;
    [key: string]: any;
  }
) => T;

// 判断是否对象
const inObject = <T extends any>(data: T) => Object.prototype.toString.call(data) === '[object Object]';

// 时间处理
const dateRange: dateRangeType = (data = {}, times = {}) => {
  for (const key in times) {
    if (data[key] && data[key].length === 2 && times[key].length === 2) {
      data[times[key][0]] = data[key][0] && moment(data[key][0]).unix();
      data[times[key][1]] = data[key][1] && moment(data[key][1]).unix();
      delete data[key];
    }
  }
};
// 处理毫秒格式时间
const dateRangeMs: dateRangeType = (data = {}, times = {}) => {
  for (const key in times) {
    if (data[key] && data[key].length === 2 && times[key].length === 2) {
      data[times[key][0]] = data[key][0] && moment(data[key][0]).startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');
      data[times[key][1]] = data[key][1] && moment(data[key][1]).endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');
      delete data[key];
    }
  }
};

// 处理方法枚举
const contentFormat: Record<string, Function> = {
  timeGroup: dateRange,
  timeGroupMs: dateRangeMs
};

/**
 * @method 数据处理
 * @param data {Object} 原始数据
 * @param options {{timeGroup}} 需要处理的
 * @returns {Object} 处理后数据
 * @desc 数据处理，根据options处理对应data里的数据
 * **/
const handleFormat: formatType = (data, options) => {
  try {
    if (inObject(data) && inObject(options)) {
      const preData = cloneDeep(data);
      for (const key in options) {
        if (contentFormat[key]) {
          contentFormat[key](preData, options[key]);
        }
      }

      return preData;
    }
  } catch (e) {
    console.log(e);
  }
  return data;
};
export default handleFormat;
