import React from 'react';
import { Button } from 'antd';
import { XpTable } from '@mqi/pc-components';
const Demo = () => {
  const columns = [
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
      title: '邮箱',
      width: 60,
      dataIndex: 'emial'
    }
  ];

  const data: any[] = [];
  for (let i = 0; i < 14; i++) {
    data.push({
      id: i,
      plant: '广州工厂',
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
        pagination={{ defaultPageSize: 10 }}
        rowKey='id'
        tableTitle='制造 Table'
        toolbarShowSetting={false}
        toolbarButton={
          <>
            <Button type='primary' style={{ marginRight: 10 }}>
              新增
            </Button>
            <Button>删除</Button>
          </>
        }
      />
    </>
  );
};
export default Demo;
