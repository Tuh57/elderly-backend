import { message } from 'antd';
import { RequestConfig, history } from 'umi';

const authHeaderInterceptor = (url, options) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return {
      url: `${url}`,
      options: { ...options, headers }
    };
  }
  return { url, options };
};

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const { status, url } = response;
    console.log('errorHandler', status, url);
  }
  return response;
};

const responseInterceptor = async (response, options) => {
  const { status } = response;

  // console.log(response, options, 'response');
  if (options.responseType === 'blob') {
    return response;
  }
  const res = await response.clone().json();
  if (res.errcode === 2004 || res.errcode === 2005) {
    console.log('responseInterceptor', status, response.errcode);
    window.localStorage.removeItem('token');
    console.log(history, 'history');
    // history.replace('/login');
    if (history.location.pathname !== '/login') {
      history.replace('/login');
    }
  }

  if (status !== 200) {
    console.log(res, 'errmsgerrmsgerrmsg');
    message.error(res.errmsg);
  }
  return response;
};

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptor],
  prefix: process.env.URL + '/api'
};

export function render(oldRender) {
  console.log('render');
  if (window.localStorage.getItem('token')) {
    oldRender();
  } else {
    console.log(history, 'history');
    if (history.location.pathname !== '/login') {
      history.replace('/login');
    }
    oldRender();
  }
}
