import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { Table, Popover, Tooltip, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import TableSetting from './compontents/tableSetting';
import type { ReactElement, ReactNode } from 'react';
import type { TableProps, TableColumnType } from 'antd';
import { useStickyPagination, useDragTable, useRowSelection } from './hooks';
import isEqual from 'lodash/isEqual';
import './index.less';

export type XpTableColumnType = {
  show?: boolean;
} & TableColumnType<any>;

export interface XpTableProps<Col = any> extends TableProps<any> {
  /**
   * @description 拓展antd的ts，增加show属性
   */
  columns: (XpTableColumnType & Col)[];
  /**
   * @default true
   * @description toolbar是否显示列设置按钮
   */
  toolbarShowSetting?: boolean;
  /**
   * @description 表头发生改变的回调，columns为新的表头数组
   */
  onColumnChange?: (columns: XpTableColumnType[]) => void;
  /**
   * @description table的title
   */
  tableTitle?: string | ReactElement;
  /**
   * @description toolbar显示的按钮,传入字符串会自带样式
   */
  toolbarButton?: ReactElement<any>;
  /**
   * @description sticky挂载的节点类名，需要加 . （目前只支持弹窗内表格的拓展）
   */
  stickyClassName?: string;
  /**
   * @description 拖拽配置项 dragSortKey是拖拽的key，onDragSortEnd是拖拽完成的回调
   */
  dragConfig?: {
    dragSortKey: string;
    onDragSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
  };
  /**
   * @description 是否开启勾选列
   * @default false
   */
  openRowSelection?: boolean;
  /**
   * @description 表格批量操作渲染的按钮
   */
  tableBatchRender?: (
    selectedRowKeys: string[] | number[],
    selectedRows: any[],
    onCleanSelected: () => void
  ) => ReactElement<any>;
  /**
   * @description 表格操作列渲染的按钮
   */
  actionRender?: (record: any, index: number) => ReactNode[];
  /**
   * @description 空数据的文案 null undefined '' 时显示
   */
  columnEmptyText?: string;
}

export interface XpTableRefType {
  selectedRowKeys?: React.Key[];
  cleanSelected?: () => void;
  rowSelection?: {
    selectedRowKeys: React.Key[];
    selectedRows: any[];
    cleanSelected: () => void;
    selectAll: () => void;
    selectRows: (event: React.Key[] | ((oldKey: React.Key) => any)) => void;
  };
}

const XpTable = forwardRef(
  (
    {
      columns = [],
      toolbarShowSetting = true,
      onColumnChange,
      tableTitle,
      toolbarButton,
      stickyClassName,
      pagination,
      dragConfig,
      rowSelection,
      tableBatchRender,
      openRowSelection = false,
      actionRender,
      columnEmptyText,
      ...restProps
    }: XpTableProps,
    ref: React.ForwardedRef<XpTableRefType>
  ) => {
    /*
     * 自定义列
     */
    const [customColumns, setCustomColumns] = useState<XpTableColumnType[]>(columns);
    const newColumns = useMemo(() => {
      /**
       * 1. 处理自定义列
       * 2. 优化表格渲染
       * 3. 处理空数据文本
       * 4. 处理编辑列
       */
      const tempColumns = [
        ...(!toolbarShowSetting
          ? columns
          : customColumns.filter((item: XpTableColumnType) => item.fixed || item.show))
      ].map(item =>
        item.hasOwnProperty('fixed')
          ? item
          : {
              shouldCellUpdate: (record: any, prevRecord: any) => !isEqual(record, prevRecord),
              render: columnEmptyText
                ? (text: any) => (text != null && text !== '' ? text : columnEmptyText)
                : undefined,
              ...item
            }
      );
      let actionCol: any;
      if (actionRender && actionRender.length > 0) {
        actionCol = {
          title: '操作',
          dataIndex: 'xp_table_action',
          fixed: 'right',
          width: 60,
          render: (_: any, record: any, index: number) => {
            const actionNodeList = actionRender(record, index);
            if (actionNodeList.length > 3) {
              const showNodeList = actionNodeList.slice(0, 2);
              const hiddenNodeList = actionNodeList.slice(2);
              const hiddenNode = (
                <Popover
                  content={hiddenNodeList.map(child => child)}
                  trigger='click'
                  arrowPointAtCenter
                  placement='bottomRight'
                  key='xp-table-action-popover'
                  overlayClassName='xp-table-action-popover'
                >
                  <Typography.Link>···</Typography.Link>
                </Popover>
              );
              showNodeList.push(hiddenNode);
              return (
                <div className='xp-mqi-table-action-col'>{showNodeList.map(child => child)}</div>
              );
            } else {
              return (
                <div className='xp-mqi-table-action-col'>{actionNodeList.map(child => child)}</div>
              );
            }
          }
        };
      }
      if (actionCol) tempColumns.push(actionCol);
      return tempColumns;
    }, [actionRender, columns, customColumns, toolbarShowSetting]);

    useEffect(() => {
      if (toolbarShowSetting) {
        setCustomColumns(columns);
      }
    }, [columns, toolbarShowSetting]);

    const toolbar = useMemo(() => {
      // 如果没有title、按钮，并且不显示设置按钮，则不展示toolbar
      if (!tableTitle && !toolbarButton && !toolbarShowSetting) {
        return null;
      }
      return (
        <div className='xp-mqi-table-toolbar'>
          {typeof tableTitle === 'string' ? (
            <div className='xp-mqi-table-toolbar-title'>{tableTitle || ''}</div>
          ) : (
            <div>{tableTitle}</div>
          )}
          <div className='xp-mqi-table-toolbar-buttons'>
            {toolbarButton || null}
            {toolbarShowSetting && (
              <Popover
                trigger='click'
                arrowPointAtCenter
                placement='bottomRight'
                overlayClassName='xp-mqi-table-popover'
                content={
                  <TableSetting
                    columns={columns}
                    setCustomColumns={(data: any) => setCustomColumns(data)}
                    onColumnChange={onColumnChange}
                  />
                }
              >
                <Tooltip title='列设置'>
                  <SettingOutlined style={{ fontSize: 16, cursor: 'pointer', marginLeft: 16 }} />
                </Tooltip>
              </Popover>
            )}
          </div>
        </div>
      );
    }, [columns, onColumnChange, tableTitle, toolbarButton, toolbarShowSetting]);

    // 拖拽
    const { dragComponents } = useDragTable({
      dataSource: restProps.dataSource as any[],
      dragConfig
    });

    // 勾选批量操作
    // 勾选批量操作
    const { selectKeys, selectedRowsRef, rowSelectChange, cleanSelected, selectAll, selectRows } =
      useRowSelection(
        tableBatchRender,
        openRowSelection,
        rowSelection,
        restProps.rowKey,
        restProps.dataSource
      );

    // 抛出一些数据 外部可以用ref访问组件内部数据
    useImperativeHandle(
      ref,
      () => ({
        selectedRowKeys: selectKeys,
        cleanSelected,
        rowSelection: {
          selectedRowKeys: selectKeys,
          cleanSelected,
          selectAll,
          selectRows,
          selectedRows: selectedRowsRef.current
        }
      }),
      [selectKeys, cleanSelected, selectAll, selectRows, selectedRowsRef]
    );

    const rowSelectBar = useMemo(() => {
      return (
        <div className='xp-mqi-table-select-bar'>
          <div>
            <span style={{ marginRight: 8 }}>已选 {selectKeys.length} 项</span>
            <Typography.Link onClick={cleanSelected}>取消选择</Typography.Link>
          </div>
          <div>
            {tableBatchRender &&
              tableBatchRender(selectKeys, selectedRowsRef.current, cleanSelected)}
          </div>
        </div>
      );
    }, [cleanSelected, selectKeys, selectedRowsRef, tableBatchRender]);

    const TableCell = useCallback(({ onMouseEnter, onMouseLeave, ...props }: any) => {
      // onMouseEnter, onMouseLeave在数据量多的时候，会严重阻塞表格单元格渲染，严重影响性能
      return <td {...props} />;
    }, []);

    // 分页器吸顶
    const container = document.querySelector(stickyClassName || '.mqi-layout-container') || window;
    const tableRef = useRef<HTMLDivElement>(null);
    useStickyPagination(tableRef, container, restProps.dataSource);

    return (
      <div className='xp-mqi-table'>
        {toolbar}
        {tableBatchRender && selectKeys.length > 0 && rowSelectBar}
        <Table
          ref={tableRef}
          bordered
          rowKey='id'
          columns={newColumns}
          pagination={
            pagination
              ? {
                  defaultPageSize: 20,
                  ...pagination,
                  size: 'small',
                  showSizeChanger: true,
                  showTotal: total => `共 ${total} 条`
                }
              : pagination
          }
          scroll={{
            x: restProps.dataSource && restProps.dataSource.length > 0 ? 'max-content' : '100%'
          }}
          {...restProps}
          components={
            dragConfig ? dragComponents : restProps.components || { body: { cell: TableCell } }
          }
          rowSelection={
            openRowSelection || tableBatchRender
              ? {
                  ...rowSelection,
                  // 有tableBatchRender的时候走组件的用组件内部属性, 传入的onChange，selectedRowKeys失效
                  selectedRowKeys: selectKeys,
                  onChange: rowSelectChange
                }
              : rowSelection
          }
          sticky={
            // 布尔值覆盖，对象参数则继承
            typeof restProps.sticky === 'boolean'
              ? restProps.sticky
              : {
                  // 默认挂载在基座最外层加了overflow：auto的元素上
                  getContainer: () =>
                    (document.querySelector(
                      stickyClassName || '.mqi-layout-container'
                    ) as HTMLElement) || window,
                  offsetScroll: 54,
                  ...restProps.sticky
                }
          }
        />
      </div>
    );
  }
);

export default React.memo(XpTable);
