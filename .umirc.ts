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
  proxy: {
    '/api': {
      // target: 'http://10.193.202.188:8080',
      target: 'http://8.134.151.47:8000',
      changeOrigin: true
    }
  },
  define: {
    'process.env.URL': 'http://8.134.151.47:8000'
  },
  base: '/pc/',
  publicPath: '/pc/',
  outputPath: './dist/pc/'
});
