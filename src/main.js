import Vue from 'vue'
import App from './App.vue'
// 引入仓库
import store from '@/store'
// 三级联动组件 ---全局组件
import TypeNav from '@/components/TypeNav'
// 引入轮播图的 ---全局组件
import Carousel from '@/components/Carousel'
/*// 测试发请求
import {reqCategoryList} from '@/api'
reqCategoryList();*/
// 第一个参数 ： 全剧组件的名字   第二个参数： 那个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
// 引入路由
import router from '@/router'
Vue.config.productionTip = false;
// 引入mockServe.js----mock数据
import '@/mock/mockServe'
// 引入swipe样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
      Vue.prototype.$bus = this;
  },
  // 注册路由   底下的写法kv一致省略V
  // 注册路由信息： 当这里书写router的时候组件身上都拥有$router, $route属性
  router,
  // 注册仓库： 组件实例身上会多了一个属性$.store属性
  store
}).$mount('#app');
