import React, { useCallback, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

interface Props {
  dataSource: any[];
  dragConfig?: {
    dragSortKey: string;
    onDragSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
  };
}

const useDragTable = ({ dataSource, dragConfig }: Props) => {
  // 如果没有配置项 不走下面逻辑
  const { dragSortKey, onDragSortEnd } = dragConfig || {};
  const SortableItem = useMemo(() => {
    return SortableElement((props: any) => <tr {...props} />);
  }, []);
  const SortableBody = useMemo(() => {
    return SortableContainer((props: any) => <tbody {...props} />);
  }, []);
  const SortableCell = useCallback(({ onMouseEnter, onMouseLeave, ...restProps }: any) => {
    // onMouseEnter, onMouseLeave在数据量多的时候，会严重阻塞表格单元格渲染，严重影响性能
    return <td {...restProps} />;
  }, []);

  const DraggableContainer = useCallback(
    (props: any) => (
      <SortableBody
        useDragHandle
        disableAutoscroll
        onSortEnd={onDragSortEnd}
        helperClass='xp-mqi-table-drag-row'
        {...props}
      />
    ),
    [SortableBody, onDragSortEnd]
  );
  const DraggableBodyRow = useCallback(
    ({ ...props }: any) => {
      const index = dataSource.findIndex(
        (x: any) => x[dragSortKey || 'id'] === props['data-row-key']
      );
      return <SortableItem index={index} {...props} />;
    },
    [SortableItem, dataSource, dragSortKey]
  );
  const dragComponents = useMemo(() => {
    return {
      body: {
        wrapper: DraggableContainer,
        row: DraggableBodyRow,
        cell: SortableCell
      }
    };
  }, [DraggableBodyRow, DraggableContainer, SortableCell]);
  if (!dragConfig) return {};
  return { dragComponents };
};

export default useDragTable;
