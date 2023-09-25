import { useState, useCallback, useRef, useEffect } from 'react';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import type { TableProps } from 'antd';

const useRowSelection = (
  // 这两个作为开关
  tableBatchRender: any,
  openRowSelection: boolean,
  // 函数需要用到的
  rowSelection: TableProps<any>['rowSelection'],
  rowKey: TableProps<any>['rowKey'],
  dataSource: TableProps<any>['dataSource']
) => {
  const [selectKeys, setSelectKeys] = useState<any[]>([]);
  const selectedRowsRef = useRef<any>();
  // 勾选change
  const rowSelectChange = (selectedRowKeys: any[], selectedRows: any[]) => {
    setSelectKeys(selectedRowKeys);
    selectedRowsRef.current = selectedRows;
    if (rowSelection?.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows);
    }
  };

  // 清空勾选
  const cleanSelected = useCallback(() => {
    setSelectKeys([]);
    if (rowSelection?.onChange) {
      rowSelection.onChange([], []);
    }
    if (rowSelection?.onSelectNone) {
      rowSelection.onSelectNone();
    }
  }, [rowSelection]);

  // 根据rowKey获取每一行的'key'
  const getRowKey = (record: any, index: number) => {
    let key: React.Key;
    if (isFunction(rowKey)) {
      key = rowKey(record, index);
    } else {
      const newRowKey = isString(rowKey) ? rowKey : 'id';
      key = record?.[newRowKey];
    }
    return key;
  };

  const selectAll = useCallback(() => {
    const keys = dataSource?.map((record, index) => getRowKey(record, index)) || [];
    setSelectKeys(keys);
  }, [dataSource]);

  const selectRows = useCallback(
    (event: React.Key[] | ((oldKey: React.Key) => any)) => {
      if (typeof event === 'function') {
        const newSelectKeys = selectKeys?.filter(event);
        setSelectKeys(newSelectKeys);
      } else if (Array.isArray(event)) {
        setSelectKeys(event);
      } else {
        console.warn('selectRows事件仅支持传入数组或回调函数');
      }
    },
    [selectKeys]
  );

  // 数据刷新则根据 key 刷新选中行
  useEffect(() => {
    if (!openRowSelection && !tableBatchRender) {
      return;
    }
    // 表格刷新时，判断keys中是否有dataSource的【id】
    if (selectKeys && selectKeys.length > 0 && dataSource) {
      const newSelectKeys: any[] = [];
      for (let i = 0; i < dataSource.length; i++) {
        const key = getRowKey(dataSource[i], i);
        const index = selectKeys.indexOf(key);
        if (index > -1) {
          newSelectKeys.push(key);
        }
      }
      setSelectKeys(newSelectKeys);
    }
  }, [dataSource]);

  return {
    selectKeys,
    selectedRowsRef,
    rowSelectChange,
    cleanSelected,
    selectAll,
    selectRows
  };
};

export default useRowSelection;
