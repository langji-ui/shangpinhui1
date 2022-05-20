// 当前这个模块： API进行统一管理
import requests from "@/api/request";
import mockRequests from './mockAjax';

// 三级联动的接口
// /api/product/getBaseCategoryList  ---  get请求  --- 无参数

export const reqCategoryList = () =>
    // 箭头函数可以把 ---函数体{}--   ----return-----  去掉
    // 发请求
    // 发送 get 请求  返回的是promise对象
    requests({
        method: 'get',
        url: '/product/getBaseCategoryList',
    });

// 获取banner首页轮播图的接口
export const reqGetBannerList = ()=> mockRequests.get('/banner');

// 获取floor组件的数据-----1.写请求  2. 仓库三连环
export const reqFloorList= ()=>mockRequests.get('/floor');

// 获取搜索模块的数据  地址：/api/list   请求方式： post   参数：需要带参数
/*
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
}
*/
// 当前这个函数需不需要接受外部传递参数
// 当前这个接口(获取搜索模块的数据)给服务器传递一个默认的参数params,【至少是一个空对象】
export const reqGetSearchInfo = (params)=>requests({url: "/list",method: "post",data:params});



