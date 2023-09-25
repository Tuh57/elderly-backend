import handleFormat from '@/common/utils/handleFormat';
import valueToLabel from '@/common/utils/valueToLabel';

//将纯数组数据处理成label value格式
const handleArrayFormat = (present: any) => {
  const arr: any[] = [];
  if (present) {
    present.map((item: any) => {
      arr.push({ label: item, value: item });
    });
  }
  return arr;
};

export { valueToLabel, handleFormat, handleArrayFormat };
