import React from 'react';
import { Typography } from 'antd';
import { XpTable } from '@mqi/pc-components';
const Demo = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      fixed: 'left',
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: '工厂',
      dataIndex: 'plant',
      show: true
    },
    {
      title: '车间',
      dataIndex: 'shift',
      show: true
    },
    {
      title: '用户',
      show: true,
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      // 不配置show 或者show配置为false 不展示该列
      dataIndex: 'emial'
    },
    {
      title: '电话',
      show: false,
      dataIndex: 'tel'
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
        tableTitle='自定义操作列 Table'
        actionRender={(record: any, index: number) => [
          <Typography.Link key='click' onClick={() => console.log(record, index)}>
            点击
          </Typography.Link>,
          <Typography.Link key='edit' style={{ marginRight: 10 }}>
            编辑
          </Typography.Link>,
          <Typography.Link key='delete'>删除</Typography.Link>,
          <Typography.Link key='look' onClick={() => console.log(record, index)}>
            查看
          </Typography.Link>,
          <Typography.Link key='styles'>测试样式</Typography.Link>
        ]}
      />
    </>
  );
};
export default Demo;
