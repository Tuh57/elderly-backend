---
group:
  path: /@mqi/pc-components
  title: '@mqi/pc-components'
  order: 1
title: XpTable
order: 1
---
## 基本用法

<code src="./demo/default.tsx" title="基本用法" desc='与`antd`的组件一样，传入 **columns** 和 **tableSource**，columns的每一项都需要加适合的width，否则无数据的时候表头会混乱' ></code>

## 带Toolbar的Table

<code src="./demo/toolbar.tsx" title="带Toolbar的Table" desc='传入 `tableTitle` 自定义table的标题，`toolbarButton`可以自定义按钮组' ></code>

## 自定义列

<code src="./demo/columns.tsx" title="自定义列" desc='自定义列按列按钮默认展示，`toolbarShowSetting`设置为false不展示列设置按钮，使用该功能时需要`dataIndex`唯一' ></code>


## 批量操作

<code src="./demo/batch.tsx" title="表格批量操作" desc='传入tableBatchRender渲染批量操作按钮，此时`rowSelection`的 **selectedRowKeys** 失效, 可以通过[XpTableRef](#xptableref)来调用内部方法' ></code>

## 自动勾选列

<code src="./demo/rowSelect.tsx" title="自动勾选列" desc='传入 **openRowSelection** 开启勾选列，可以通过[XpTableRef](#xptableref)来调用内部方法' ></code>

## 拖拽手柄列

<code src="./demo/drag.tsx" title="拖拽手柄列" desc='传入`dragConfig`对象可以配置拖拽key和拖拽结束事件回调，columns增加拖拽手柄列' ></code>

## 自定义操作列

<code src="./demo/action.tsx" title="自定义操作列" desc='当`ReactNode`数组超过3个之后会显示折叠效果' ></code>

<API src='./index.tsx'></API>
<Alert type="success">
  组件继承了antd的Table组件参数，可以使用其功能
</Alert>

### XpTableRef

| 参数 | 说明 | 类型 | 
| --- | --- | --- |
| selectedRowKeys | 选中的Key数组，兼容旧版本，新版建议使用rowSelection的内部变量 | `React.Key[]` |
| cleanSelected | 清空选中列，兼容旧版本，新版建议使用rowSelection的内部变量 | `() => void` |
| rowSelection.selectedRowKeys | 选中的Key数组 | `React.Key[]` |
| rowSelection.cleanSelected | 清空选中列 | `() => void` |
| rowSelection.selectAll | 选中列表全部行 | `() => void` |
| rowSelection.selectRows | 选中列表部分行，传入回调函数时会调用Keys数组的filter方法 | `(event: React.Key[] \| ((oldKey: React.Key) => any))=>void` |

