import React, { useEffect, useRef, useState } from 'react';
import { Table, Checkbox, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { XpTableColumnType } from '../index';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
const TableSetting = ({
  columns,
  setCustomColumns,
  onColumnChange
}: {
  columns: XpTableColumnType[];
  setCustomColumns: (data: any) => void;
  onColumnChange?: (columns: XpTableColumnType[]) => void;
}) => {
  const [colDataSource, setColDataSource] = useState<XpTableColumnType[]>([]);
  const topList = useRef<any[]>([]);
  const bottomList = useRef<any[]>([]);
  useEffect(() => {
    // 把传入的columns根据fixed区分开
    const newColDataSource: any[] = [];
    const newTopList: any[] = [];
    const newBottomList: any[] = [];
    columns?.forEach(item => {
      if (item?.fixed === 'left') {
        newTopList.push(item);
      } else if (item?.fixed === 'right') {
        newBottomList.push(item);
      } else {
        newColDataSource.push(item);
      }
    });
    topList.current = newTopList;
    bottomList.current = newBottomList;
    setColDataSource(newColDataSource);
  }, [columns]);
  const DragHandle = SortableHandle(() => (
    <MenuOutlined className='xp-mqi-table-DragHandle' style={{}} />
  ));
  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortableBody = SortableContainer((props: any) => <tbody {...props} />);
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const cols: any = [...colDataSource];
      const newCols: any[] = arrayMoveImmutable([].concat(cols), oldIndex, newIndex).filter(
        (el: any) => !!el
      );
      // 将列重新排序，回显到外层的table
      setColDataSource(newCols);
      setCustomColumns([...topList.current, ...newCols, ...bottomList.current]);
      // 将最新的columns透传出去
      if (onColumnChange) onColumnChange([...topList.current, ...newCols, ...bottomList.current]);
    }
  };
  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      onSortEnd={onSortEnd}
      helperClass='xp-mqi-table-drag-row xp-mqi-table-setting-drag-row'
      {...props}
    />
  );
  const DraggableBodyRow = ({ ...props }: any) => {
    const index = colDataSource.findIndex((x: any) => x.dataIndex === props['data-row-key']);
    return <SortableItem index={index} {...props} />;
  };

  const toggleShow = (e: CheckboxChangeEvent, dataIndex: string) => {
    const newCols = [...colDataSource];
    const index: any = newCols.findIndex((item: XpTableColumnType) => item.dataIndex === dataIndex);
    newCols[index].show = e.target.checked;
    setColDataSource(newCols);
    setCustomColumns([...topList.current, ...newCols, ...bottomList.current]);
    // 将最新的columns透传出去
    if (onColumnChange) onColumnChange([...topList.current, ...newCols, ...bottomList.current]);
  };

  const cols: XpTableColumnType[] = [
    {
      title: '显示',
      width: 60,
      dataIndex: 'show',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Checkbox
            checked={text}
            onChange={(e: CheckboxChangeEvent) => {
              toggleShow(e, record.dataIndex);
            }}
          />
        );
      }
    },
    {
      title: '列名称',
      dataIndex: 'title',
      render(value) {
        return (
          <Typography.Text ellipsis={{ tooltip: value }} style={{ maxWidth: 130, margin: 'unset' }}>
            {value}
          </Typography.Text>
        );
      }
    },
    {
      title: '拖动排序',
      dataIndex: 'sort',
      align: 'center',
      width: 90,
      render: () => <DragHandle />
    }
  ];

  return (
    <div style={{ width: 320 }}>
      <Table
        bordered
        childrenColumnName='no_show_children'
        rowKey='dataIndex'
        className='xp-mqi-table'
        dataSource={colDataSource}
        scroll={{ x: 'max-content', y: 400 }}
        columns={cols}
        pagination={false}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow
          }
        }}
      />
    </div>
  );
};

export default TableSetting;
