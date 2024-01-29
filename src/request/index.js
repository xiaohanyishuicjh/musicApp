import axios from "axios";
export const wyService = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 8000,
    withCredentials: true, //关键
});
wyService.defaults.withCredentials = true;
wyService.interceptors.request.use((config)=>{
    // const cookie =  LocalCache.getCache("cookie") ?? '';
    // console.log(cookie,"存储的cookie");
    // config.headers.Cookie = cookie;
    return config;

});
export const qqService = axios.create({
    baseURL: "http://localhost:3200",
    timeout: 8000,
});
qqService.interceptors.request.use((config)=>{
    // const cookie =  LocalCache.getCache("cookie") ?? '';
    // console.log(cookie,"存储的cookie");
    // config.headers.Cookie = cookie;
    return config;

});