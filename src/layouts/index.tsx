import React, { useRef } from 'react';
import { useCallback, useEffect } from 'react';
import { useAliveController } from 'react-activation';
import XpLayouts from 'd-layout';
import { getLoginInfo, loginOutReq } from './api';
import NiceModal from '@ebay/nice-modal-react';
import { XpFeedback } from '@mqi/pc-components';

const appPrefix = process.env.base;
const armsPid = process.env.armsPid;

window.mockRouter = [
  {
    url: '/pc/1',
    id: '/pc/1',
    icon: '',
    buttons: null,
    resourceType: 1,
    resourceName: '数据管理',
    title: '数据管理',
    children: [
      {
        url: '/pc/device/',
        id: '/pc/device/',
        icon: '',
        buttons: null,
        children: [
          {
            url: '/pc/device/list',
            id: '/pc/device/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '机器人设备',
            title: '机器人设备'
          },
          {
            url: '/pc/device/detail',
            id: '/pc/device/detail',
            icon: '',
            buttons: null,
            isHidden: true,
            resourceType: 2,
            resourceName: '设备详情',
            title: '设备详情'
          }
        ],
        resourceType: 1,
        isHidden: false,
        permission: '',
        resourceName: '设备管理',
        title: '设备管理'
      },
      {
        url: '/pc/health/',
        id: '/pc/health/',
        icon: '',
        buttons: null,
        children: [
          {
            url: '/pc/health/list',
            id: '/pc/health/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '健康档案',
            title: '健康档案'
          },
          {
            url: '/pc/health/detail',
            id: '/pc/health/detail',
            icon: '',
            buttons: null,
            resourceType: 2,
            isHidden: true,
            resourceName: '健康档案详情',
            title: '健康档案详情'
          },
          {
            url: '/pc/health/record',
            id: '/pc/health/record',
            icon: '',
            buttons: null,
            resourceType: 2,
            isHidden: true,
            resourceName: '健康监测详情',
            title: '健康监测详情'
          }
        ],
        resourceType: 1,
        isHidden: false,
        permission: '',
        resourceName: '健康数据',
        title: '健康数据'
      },
      {
        url: '/pc/call/',
        id: '/pc/call/',
        icon: '',
        buttons: null,
        children: [
          {
            url: '/pc/call/list',
            id: '/pc/call/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '互动数据',
            title: '互动数据'
          },
          {
            url: '/pc/call/detail',
            id: '/pc/call/detail',
            icon: '',
            buttons: null,
            isHidden: true,
            resourceType: 2,
            resourceName: '互动详情',
            title: '互动详情'
          }
        ],
        resourceType: 1,
        isHidden: false,
        permission: '',
        resourceName: '互动数据',
        title: '互动数据'
      },
      {
        url: '/pc/alarm/',
        id: '/pc/alarm/',
        icon: '',
        buttons: null,
        children: [
          {
            url: '/pc/alarm/list',
            id: '/pc/alarm/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '异常警报记录',
            title: '异常警报记录'
          }
        ],
        resourceType: 1,
        isHidden: false,
        permission: '',
        resourceName: '安全监控',
        title: '安全监控'
      }
    ]
  },
  {
    url: '/pc/2',
    id: '/pc/2',
    icon: '',
    buttons: null,
    resourceType: 1,
    resourceName: '系统管理',
    title: '系统管理',
    children: [
      {
        url: '/pc/admin/',
        id: '/pc/admin/',
        icon: '',
        buttons: null,
        children: [
          {
            url: '/pc/admin/list',
            id: '/pc/admin/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '账户列表',
            title: '账户列表'
          },
          {
            url: '/pc/admin/role',
            id: '/pc/admin/role',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '角色管理',
            title: '角色管理'
          }
        ],
        resourceType: 1,
        isHidden: false,
        permission: '',
        resourceName: '账户管理',
        title: '账户管理'
      },
      {
        url: '/pc/user/',
        id: '/pc/user/',
        icon: '',
        buttons: null,
        resourceType: 1,
        children: [
          {
            url: '/pc/user/elderly/list',
            id: '/pc/user/elderly/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '老人端用户',
            title: '老人端用户'
          },
          {
            url: '/pc/user/children/list',
            id: '/pc/user/children/list',
            icon: '',
            buttons: null,
            resourceType: 2,
            resourceName: '子女端用户',
            title: '子女端用户'
          }
        ],
        isHidden: false,
        permission: '',
        resourceName: '用户管理',
        title: '用户管理'
      }
    ]
  }
];

export default function (props) {
  console.log(props, 'props');

  const { pathname } = props.location;

  const pathRef = useRef();

  const loginOut = async () => {
    try {
      const res = await loginOutReq({});
      window.localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (e) {
      console.log(e, '登出错误');
    }
  };

  const switchOrg = async (orgId) => {
    const res = await switchOrgReq({ orgId });
    if (res?.success) {
      location.reload();
    }
  };

  const { dropScope } = useAliveController();
  // 关闭页签时清空缓存
  const clearCache = useCallback(
    (e: any) => {
      if (e.data.deleteTab) {
        dropScope(e.data.deleteTab);
      }
    },
    [dropScope]
  );

  useEffect(() => {
    // 添加监听事件，与基座通讯，关闭页签时调用 clearCache
    window.addEventListener('message', clearCache, false);
    return () => {
      window.removeEventListener('message', clearCache, false);
    };
  }, [clearCache]);

  // useEffect(() => {
  //   getLoginInfo().then((res) => {
  //     console.log(res);
  //   });
  // }, []);

  if (props.location.pathname === '/login') {
    return <div>{props.children}</div>;
  } else {
    return (
      <XpLayouts
        initReq={getLoginInfo}
        switchOrg={switchOrg}
        loginOut={loginOut}
        appPrefix="/pc"
        armsPid="11111"
        {...props}
      />
    );
  }
}
