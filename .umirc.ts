import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  theme: {
    'primary-color': '#0068ff',
    'success-color': '#19b144',
    'warning-color': '#ffaa2a',
    'error-color': '#e02716',
    'link-color': '#0068ff'
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true
  },
  headScripts: [{ src: '/sso-components.min.js' }, { src: '/BrowserPrint-3.1.250.min.js' }],
  links: [{ href: '/sso-components.min.css', rel: 'stylesheet' }],
  proxy: {
    '/api': {
      // target: 'http://10.193.202.188:8080',
      target: 'http://8.134.151.47:8000',
      changeOrigin: true
    }
  },
  base: '/pc/',
  publicPath: '/pc/',
  outputPath: './dist/pc/'
});
