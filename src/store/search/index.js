import { reqGetSearchInfo } from "@/api";
// search 模块的小仓库
const state = {
        // 仓库初始状态
        searchList: {}
};
const mutations = {
    GETSEARCHLIST(state,searchList) {
            state.searchList = searchList
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({commit},params = {}) {
        // 当前这个reqSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // 这个params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        // console.log(result)
        if (result.code == 200) {
            commit("GETSEARCHLIST",result.data)
        }
    }
};
// 计算属性  在项目中为了 简化数据而生。
// 可以把将来组件当中用的数据简化一下【将来组件获取数据就方便了】
const getters = {
    // 这个字state是当前组件的state不是大仓库中的state

    // 商品列表数据
    goodsList(state){
        // 假如没有网state.searchList.goodsList应该返回的是undefined
        // 计算的新的属性值至少为一个数组
        return state.searchList.goodsList || [];
    },
    // 品牌属性
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    // 售卖属性
    attrsList(state){
        return state.searchList.attrsList;
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}


