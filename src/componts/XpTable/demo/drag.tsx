import React, { useState, useEffect } from 'react';
import { XpTable } from '@mqi/pc-components';
import { SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
const Demo = () => {
  const [data, setData] = useState<any[]>([]);
  const DragHandle = SortableHandle(() => <MenuOutlined className='xp-mqi-table-DragHandle' />);
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
      title: '操作',
      width: 60,
      fixed: 'right',
      render: () => <DragHandle />
    }
  ];

  useEffect(() => {
    const newData: any[] = [];
    for (let i = 0; i < 4; i++) {
      newData.push({
        id: i,
        plant: '广州工厂',
        shift: '总装',
        username: '人' + i,
        emial: '@.com',
        tel: '1888888888'
      });
    }
    setData(newData);
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const newData: any = [...data];
      const sortData: any[] = arrayMoveImmutable([].concat(newData), oldIndex, newIndex).filter(
        (el: any) => !!el
      );
      setData(sortData);
    }
  };

  return (
    <>
      <XpTable
        columns={columns}
        dataSource={data}
        pagination={false}
        toolbarShowSetting={false}
        rowKey='id'
        dragConfig={{
          // dragSortKey 需要与table的 rowKey一致
          dragSortKey: 'id',
          onDragSortEnd: onSortEnd
        }}
      />
    </>
  );
};
export default Demo;
