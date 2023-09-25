import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography } from 'antd';
import { XpTable } from '@mqi/pc-components';
const Demo = () => {
  const [data, setData] = useState<any[]>([]);
  // 通过ref获取组件内部的选中数组selectedRowKeys，和清空选中方法onCleanSelected
  const ref = useRef<any>();
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
      width: 100,
      show: true
    },
    {
      title: '车间',
      dataIndex: 'shift',
      width: 100,
      show: true
    },
    {
      title: '用户',
      width: 100,
      show: true,
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      // 不配置show 或者show配置为false 不展示该列
      width: 100,
      dataIndex: 'emial'
    },
    {
      title: '电话',
      show: false,
      width: 100,
      dataIndex: 'tel'
    },
    {
      title: '右固定',
      width: 60,
      fixed: 'right',
      dataIndex: 'tel'
    }
  ];
  useEffect(() => {
    const newData: any[] = [];
    for (let i = 0; i < 14; i++) {
      newData.push({
        id: 'id' + i,
        plant: '广州工厂',
        shift: '总装',
        username: '人',
        emial: '@.com',
        tel: '1888888888'
      });
    }
    setData(newData);
  }, []);

  const deleteRows = (selectedRowKeys: React.Key[]) => {
    const newData = data.filter(item => !selectedRowKeys.includes(item.id));
    setData(newData);
  };

  return (
    <>
      <Button onClick={() => console.log(ref.current?.selectedRowKeys)}>测试ref</Button>
      <XpTable
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 10 }}
        rowKey='id'
        tableTitle='制造 Table'
        ref={ref}
        tableBatchRender={(
          selectedRowKeys: React.Key[],
          selectedRows: any[],
          cleanSelected: () => void
        ) => (
          <>
            <Typography.Link
              style={{ marginRight: 10 }}
              onClick={() => {
                deleteRows(selectedRowKeys);
                cleanSelected();
              }}
            >
              批量删除
            </Typography.Link>
            <Typography.Link>批量导出</Typography.Link>
          </>
        )}
        rowSelection={{
          onChange: (...props: any) => {
            console.log(props);
          },
          onSelectNone: () => console.log(1111111)
        }}
      />
    </>
  );
};
export default Demo;
