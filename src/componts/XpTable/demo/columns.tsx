import React, { useEffect, useMemo, useState } from 'react';
import { XpTable } from '@mqi/pc-components';
const Demo = () => {
  const [list, setList] = useState<any[]>([]);
  // console.log(111)
  const columns = useMemo(() => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        fixed: 'left',
        width: 60,
        render: (_: any, __: any, index: number) => index + 1
      },
      {
        title: '工厂',
        dataIndex: 'plant',
        show: true,
        width: 60
      },
      {
        title: '车间',
        dataIndex: 'shift',
        show: true,
        width: 60
      },
      {
        title: '用户',
        show: true,
        dataIndex: 'username',
        width: 60
      },
      {
        title: '邮箱',
        width: 60,
        // 不配置show 或者show配置为false 不展示该列
        dataIndex: 'emial'
      },
      {
        title: '电话',
        show: false,
        width: 60,
        dataIndex: 'tel'
      },
      {
        title: '右固定',
        width: 60,
        fixed: 'right',
        dataIndex: 'tel'
      }
    ];
  }, []);
  useEffect(() => {
    const data: any[] = [];
    for (let i = 0; i < 14; i++) {
      data.push({
        id: i,
        plant: '广州工厂' + i,
        shift: '总装',
        username: '人',
        emial: '@.com',
        tel: '1888888888'
      });
    }
    setList(data);
  }, []);

  return (
    <>
      <XpTable
        columns={columns}
        dataSource={list}
        pagination={{ defaultPageSize: 10 }}
        rowKey='id'
        // tableTitle='制造 Table'
      />
    </>
  );
};
export default Demo;
