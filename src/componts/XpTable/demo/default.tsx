import React from 'react';
import { XpTable } from '@mqi/pc-components';
const Demo = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: '工厂',
      dataIndex: 'plant',
      ellipsis: true,
      width: 60
    },
    {
      title: '车间',
      dataIndex: 'shift',
      width: 60
    },
    {
      title: '用户',
      dataIndex: 'username',
      width: 60
    },
    {
      title: '用户1',
      dataIndex: 'username'
    },
    {
      title: '用户2',
      dataIndex: 'username'
    },
    {
      title: '用户3',
      dataIndex: 'username'
    },
    {
      title: '用户3',
      dataIndex: 'username'
    }
  ];
  const data: any[] = [];
  for (let i = 0; i < 14; i++) {
    data.push({
      id: i,
      plant: '广州工厂1231312313',
      shift: '总装',
      username: '人',
      emial: '@.com',
      tel: '1888888888'
    });
  }

  return (
    <>
      <XpTable
        columns={columns}
        dataSource={data}
        toolbarShowSetting={false}
        pagination={{ defaultPageSize: 50 }}
        rowKey='id'
      />
    </>
  );
};
export default Demo;
