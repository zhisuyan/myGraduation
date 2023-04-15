import axios from 'axios';

export const createAxiosByinterceptors = config => {
  const instance = axios.create({
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'http://8.134.166.213:3000',
    timeout: 15000, //超时配置
    withCredentials: false, //跨域携带cookie
    ...config, // 自定义配置覆盖基本配置
  });

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      const adminPattern = /\/admin\/\S*/;
      const userPattern = /\/userCtrl\/\S*/;

      if (adminPattern.test(config.url)) {
        // 获取token
        let token = window.sessionStorage.getItem('adminToken');
        // 添加token
        config.headers.Authorization = JSON.parse(token);
      } else if (userPattern.test(config.url)) {
        // 获取token
        let token = window.sessionStorage.getItem('userToken');
        // 添加token
        config.headers.Authorization = JSON.parse(token);
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};
