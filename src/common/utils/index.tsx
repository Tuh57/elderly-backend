import handleFormat from '@/common/utils/handleFormat';
import valueToLabel from '@/common/utils/valueToLabel';
import { request } from 'umi';
import moment from 'moment';

const exportData = (res: any, fileName?: string) => {
  console.log(res);

  const blob = new Blob(['\ufeff' + res], {
    type: 'text/csv;charset=UTF-8'
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // link.download = '标准模板.xls'
  // 文件名命名规范：三级菜单表格名称-导出时间，时间格式：年月日时分秒
  const formatName = `${fileName}-${moment().format('YYYYMMDDHHmmss')}`;
  fileName && link.setAttribute('download', formatName + '.csv');
  link.click();
  link.remove();
};

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

const exportReq = async ({ pagination, param = {}, title, exportUrl }) => {
  // console.log(params, 'params');

  const file = await request(exportUrl, {
    method: 'POST',
    data: {
      param,
      page: pagination.current,
      size: pagination.pageSize
    }
  });
  exportData(file, title);
};

export { valueToLabel, handleFormat, handleArrayFormat, exportReq };
