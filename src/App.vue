<template>
  <div>
    <Header></Header>
    <!--路由组件出口的地方-->
    <router-view></router-view>
    <!-- 在Home Search显示，  在登陆、 注册隐藏  -->
    <Footer v-show="$route.meta.show"></Footer>
<!--    <Footer></Footer>-->
  </div>
</template>
<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  export default {
    components: {
      Header,
      Footer
    },
    mounted() {
      // 派发一个action||获取商品分类的三级列表数据
      // 通知vuex发请求，获取数据存储于仓库当中  --- dispatch-- 是异步操作，用actions接受actions出来的是promise需要async
      this.$store.dispatch('categoryList');
    }
  }
</script>
<style scoped>

</style>
