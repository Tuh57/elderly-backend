import { RequestConfig, history } from 'umi';

const authHeaderInterceptor = (url, options) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const headers = {
      'Content-Type': 'application/json',
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

const responseInterceptor = (response) => {
  const { status } = response;
  if (status !== 200 || response.errcode === 2004 || response.errcode === 2005) {
    console.log('responseInterceptor', status, response.errcode);
    window.localStorage.removeItem('token');
    history.push('/login');
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
    history.push('/login');
    oldRender();
  }
}
