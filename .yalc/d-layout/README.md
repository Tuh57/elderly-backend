#

[![NPM version](https://img.shields.io/npm/v/.svg?style=flat)](https://npmjs.org/package/)
[![NPM downloads](http://img.shields.io/npm/dm/.svg?style=flat)](https://npmjs.org/package/)

## Install

```bash
$ npm install
```

```bash
$ npm run dev
$ npm run build
```

## Options

TODO

## LICENSE

MIT

## 更新日志

### 1.4.5

`2023.07`

- 修复全屏模式下的浮层遮挡问题
- 增加面包屑父级菜单跳转
- 菜单查询改为树级结构
- 开启 openPageAuth 情况下，去掉 path 尾斜杠

### 1.4.3

`2023.06`

- 优化系统异常提示

### 1.4.1

`2023.05`

- 优化环境提示判断

### 1.4.0

`2023.05`

- 修复 arms 页面访问上报在 Keep-Alive 情况下的记录问题
- 修复侧边栏菜单 warning

### 1.3.3

`2023.04`

- 非生产环境增加环境名称提示
- tab 栏增加清空选项，支持清空左边、右边、其他 tab
- arms 去掉武汉 uat 域名

### 1.3.2

`2023.03` 升级此版本需确保所有页面资源类型都是菜单

- 优化侧边栏菜单渲染逻辑，增加对`resourceType`的判定
- 优化顶部目录布局

### 1.3.1

`2023.03`

- 对`url`中有`/reportCenter/`，即报表中心的页面增加权限

### 1.3.0

`2023.03` 此版本需要下载或更新 `@mqi/hooks@1.2.0`

- 右上角增加菜单搜索功能，可跳转到对应菜单
- 增加`openCheckVersion`参数，可开启检测版本更新
- 增加`openPageAuth`参数，可开启页面权限，有文件无权限页面将不会渲染
- 去除`BEIDOU_LAYOUT.closeTab()`不可关闭最后一个 tab 的限制
- 优化初始化，无权限、系统异常提示的交互
- 根据`appName`动态渲染浏览器标题
- 收缩左上角北斗图标点击事件区域
- 代码抽离，减少复杂度
- 修复已知问题

## API

| 参数               | 说明                                         | 类型                              | 默认值  |
| ------------------ | -------------------------------------------- | --------------------------------- | ------- |
| initReq            | 获取初始化数据接口（权限、组织信息）         | `() => Promise<any>`              |
| appPrefix          | 传入 umi 的 base 配置                        | `string`                          |
| switchOrg          | 切换组织的方法                               | `(orgId: string) => Promise<any>` |
| loginOut           | 退出登录回调                                 | `() => Promise<any>`              |
| armsPid            | arms 监控 pid，传入即开启监控                | `string`                          |
| openKeepAlive      | 开启页面缓存                                 | `boolean`                         |
| keepaliveWhiteList | 开启页面缓存后，传入的 url 不会被缓存        | `string[]`                        |
| openCheckVersion   | 打开版本检测，发现新版本提示用户             | `boolean`                         | `false` |
| openPageAuth       | 打开页面权限，无法通过路由直接访问无权限页面 | `boolean`                         | `false` |
