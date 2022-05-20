import {reqCategoryList,reqGetBannerList,reqFloorList} from  '@/api'
// home 模块的小仓库
const state = {
    // state中的数据默认初始值别乱写，服务器返回对象，---起始值就是对象。服务器返回数组，--起始值就是数组  【根据接口的返回值初始化】
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor组件的数据
    floorList: []
};
// mutations 是唯一修改state的地方
const mutations = {
    CATEGORYLIST (state,categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    // 通过API里面的接口函数调用向服务器发请求，， ----获取服务器的数据
    // state只能由mutations修改，actions获取到的数据用commit提交给mutations
     async categoryList ({commit}) {
         console.log('修改仓库中的数据');
         // 见到promise就用await async
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST',result.data)
        }
        // console.log(result)
    },
     // 获取首页轮播图的数据
     async getBannerList({commit}) {
         console.log('获取服务器的数据')
        let result = await reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
     async getFloorList({commit}) {
         let result = await reqFloorList();
         if (result.code == 200) {
             // 提交mutation
             commit('GETFLOORLIST',result.data)
         }
         console.log(result)
    }
};
// 计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}


