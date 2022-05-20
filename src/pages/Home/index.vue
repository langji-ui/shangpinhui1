<template>
    <div>
        <!--三级联动的全局组件：三级联动已经注册为全局组件，因此不需要在引入-->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <!--:list="floor" 这里是通过父传子传递数据  然后通过子组建的props接受传来的 list-->
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
      <!--  <button @click="add">点击我+1</button>
        <span>仓库的数据{{count}}</span>
        <button>点击我-1</button>-->
    </div>
</template>

<script>
    // 引入其余的组件
    import ListContainer from '@/pages/Home/ListContainer';
    import Recommend from '@/pages/Home/Recommend';
    import Rank from '@/pages/Home/Rank';
    import Like from '@/pages/Home/Like';
    import Floor from '@/pages/Home/Floor';
    import Brand from '@/pages/Home/Brand';
    // 映射为组件实例身上的属性
    import { mapState } from 'vuex'
    // import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
    export default {
        name: "index",
        components: {
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
       /* computed: {
            ...mapState(['count'])
        },
        methods: {
            add () {
                // alert('123')
                // 派发action
                this.$store.dispatch('add')
            }
        }*/
       mounted() {
           // 在派发action ,获取floor组件的数组
           this.$store.dispatch("getFloorList")
       },
        computed: {
           ...mapState({
               floorList: state=>state.home.floorList
           })
    }


    }
</script>

<style scoped>

</style>
