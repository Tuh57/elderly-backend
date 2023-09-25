import React, { useRef } from 'react';
import { Button } from 'antd';
import { XpTable } from '@mqi/pc-components';
import type { XpTableRefType } from '../../index';

const Demo = () => {
  const xpTableRef = useRef<XpTableRefType>(null);
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
    }
  ];

  const data: any[] = [];
  for (let i = 0; i < 4; i++) {
    data.push({
      id: i,
      plant: '广州工厂',
      shift: '总装',
      username: '人' + i,
      emial: '@.com',
      tel: '1888888888'
    });
  }

  const selectAll = () => {
    // 选中全部列
    // xpTableRef.current?.rowSelection?.selectAll();
    // 清空选中列
    // xpTableRef.current?.rowSelection?.cleanSelected();
    // 根据传入的参数选中部分列,传入数组直接覆盖，传入回调会调用数组的filter方法
    // xpTableRef.current?.rowSelection?.selectRows(key => {
    //   if (key !== 1) return true;
    // });
    // xpTableRef.current?.rowSelection?.selectRows([0, 1, 2]);
    // 已经选中的数组
    console.log(xpTableRef.current?.rowSelection?.selectedRows);
  };

  return (
    <>
      <Button onClick={selectAll}>选中全部</Button>
      <XpTable
        ref={xpTableRef}
        columns={columns}
        toolbarShowSetting={false}
        dataSource={data}
        openRowSelection
      />
    </>
  );
};

export default Demo;
