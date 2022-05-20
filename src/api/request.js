// 对与axios进行二次封装
import axios from 'axios';
import nprogress from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css";
// console.log(nprogress);
// stare: 进度条开始 done: 代表进度条结束
// 对外暴露
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候路径中就会出现api
    baseURL: '/api',
    // 代表请求超时的时间5s
    timeout: 5000
});

// 请求拦截器：   再发请求之前  请求拦截器可以检测到可以在请求发出去之前做一些事情
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // config : 配置对象，对象里面有一个属性很重要-----header----请求头
    // 在发送请求之前做些什么 ------ 进度条开始动
        nprogress.start();
        return config;
})

// 添加响应拦截器
requests.interceptors.response.use(function (res) {
    // 成功的回调函数：  服务器相应来数据回来以后相应拦截器可以检测到，可以做一些事情
    // 对响应数据做点什么  ----进度条结束
    nprogress.done();
    return res.data;
}, function (error) {
    // 对响应错误做点什么
    // 相应失败的回调函数
    return Promise.reject(new Error('faile'));
});
export default requests
