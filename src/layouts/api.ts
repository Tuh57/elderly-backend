// import request from '@/common/request';
import { request } from 'umi';

const gateway = process.env.gateway;
// 初始化接口
export const getLoginInfo = async () => {
  return request('/management/admin/user/info');
};
export const loginOutReq = async (params) => {
  return request('/management/auth/user/logout', {
    method: 'POST'
  });
};
