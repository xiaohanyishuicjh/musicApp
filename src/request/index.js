import axios from "axios";
import { showNotify } from "vant";

export const wyService = axios.create({
  baseURL: "http://172.20.10.3:3000",
  timeout: 8000,
  withCredentials: true, //关键
});
wyService.defaults.withCredentials = true;
wyService.interceptors.request.use((config) => {
  // const cookie =  LocalCache.getCache("cookie") ?? '';
  // console.log(cookie,"存储的cookie");
  // config.headers.Cookie = cookie;
  return config;
});
wyService.interceptors.response.use(
  (response) => {
    console.log("12345678910");
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, // 服务器状态码不是200的情况

  (error) => {
    if (error?.response?.status) {
      console.log("123456789");
      //服务器状态码的异常
      switch (
        error.response.status // 403 token过期
      ) {
        case 403:
          //message.error("登录过期，请重新登录");
          showNotify({
            message: "登录过期，请重新登录",
            color: "#fff",
            background: "#ff3344"
          });
          break; // 404请求不存在

        case 404:
          showNotify({
            message: "网络请求不存在",
            color: "#fff",
            background: "#ff3344"
          });
          break; // 其他错误，直接抛出错误提示
        default:
            showNotify({
                message: error.response.data.message,
                color: "#fff",
                background: "#ff3344"
              });
      }
      return Promise.reject(error);
    }
    else{
      showNotify({
        message: error.message,
        color: "#fff",
        background: "#ff3344"
      });
      //return Promise.reject(error);
    }
  }
);

export const qqService = axios.create({
  baseURL: "/qqApi",
  timeout: 8000,
  withCredentials: true, //关键
});
qqService.defaults.withCredentials = true;
qqService.interceptors.request.use((config) => {
  // const cookie =  LocalCache.getCache("cookie") ?? '';
  // console.log(cookie,"存储的cookie");
  // config.headers.Cookie = cookie;
  return config;
});
