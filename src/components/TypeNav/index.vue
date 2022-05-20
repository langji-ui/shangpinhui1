<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委托|委派 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!--三级联动-->
                <!--过度动画-->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!--// 利用事件委派+变成式导航实现路由的跳转与传递参数-->
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!--二级、三级分类-->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}" >
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId"><!--// :style="{display:currentIndex==index?'block':'none'}"-->
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>

                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryName">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    // 映射为组件实例身上的属性
    import {mapState} from 'vuex';
    export default {
        data(){
            return {
                // 存储用户鼠标移上哪个一级分类
                currentIndex:-1,
                show: true
            }
        },
        name: "TypeNav",
        // 组件挂载完毕： 可以向服务器发请求
        mounted() {
            // console.log('我是TypeNav挂载完毕')
            // 当组件挂载完毕，让show属性变为false
            // this.$store.dispatch('categoryList');
            // 如果不是home路由组件，将TypeNav进行隐藏
            if (this.$route.path!= '/home') {
                this.show = false
            }
        },
        computed: {
            ...mapState({
                // 右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会立刻执行一次
                // 注入一个参数state 其实即为大仓库中的数据
                categoryList: state => state.home.categoryList
            })
        },
        methods: {
            // 鼠标进入修改响应式数据currentIndex属性
            changeIndex(index){
                // index: 鼠标移上某个一级分类的元素的索引
                // console.log(index)
                // 正常情况 （用户慢慢的操作）：鼠标进入每一个 一级分类h3，都会触发鼠标进入事件
                // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件但是经过测试只有部分h3触发
                //                          及就是由于用户行为过快，导致浏览器反应不过来如果当前回调函数中有一些大量的业务，有可能出现卡顿现象
                this.currentIndex = index;
                // console.log('鼠标进入'+ index)
            },
            enterShow(){
                if (this.$route.path!='/home') {
                    this.show = true
                }
            },
            // 一级分类鼠标移除的事件回调
            leaveIndex(){
                // console.log(11)
                // 鼠标移除currentIndex,变为-1
                this.currentIndex = -1;
                // 鼠标离开的时候 让商品分类列表进行隐藏
                // this.$store.dispatch('categoryList');
                // 判断如果是search路由的话，让商品分类列表进行隐藏
                if (this.$route.path !='/home') {
                    this.show = false;
                }
            },
            // 进行路由跳转的方法
            goSearch(event){
                // 最好的解决方案-----编程式导航 + 事件委派
                // 利用事件委派存在一些问题：1.点击的一定是a标签。2.如何获取参数【1，2，3级分类的产品的名字、id】
                // 存在一些问题：事件委派，是吧全部的子节点【h3.dt.d1.em】的事件委派给父亲节点
                // 点击a标签的时候，才会进行路由跳转【怎末确定点击的一定是a标签】
                // 存在的另外一个问题： 即使你能确定点击的是a标签如何区分1.2.3.级a标签

                // 第一个问题  把子节点当中的a标签，加上自定义属性:data-categoryName，其余的子节点是没有的
                let element = event.target;
                // console.log(element);
                // 获取到触发当前这个事件的节点【h3.a.dt.dl】需要带有data-categoryname这样的节点【一定是a标签】
                // 节点有个属性dataset属性可以获取节点的自定义属性与属性值
                // console.log(element.dataset)
                let {categoryname,category1id,category2id,category3id} = element.dataset;
                // 如果标签身上拥有categoryname一定是a标签
                if (categoryname) {
                    // alert('123')
                    // 整理路由跳转的参数
                    let location = {name:"search"};
                    let query = {categoryName:categoryname}; //  categoryname---家用电器
                    // 1.2.3 级 分类的a标签
                    if (category1id) {
                        query.category1Id = category1id;
                    }else if (category2id) {
                        query.category2Id = category2id;
                    }else {
                        query.category3Id = category3id;
                    }

                    //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去

                    if (this.$route.params){
                        location.params = this.$route.params;
                        //动态给location配置对象添加query属性
                        location.query = query;
                        // 路由跳转
                        this.$router.push(location);
                    }
                    /*if (this.$router.params) {
                       location.params = this.$router.params;
                       // 动态给location配置对象添加query参数
                       location.query = query;
                       // 路由跳转
                       this.$router.push(location);
                   }*/



                    // 整理完参数
                    // console.log(location,query);
                    // 把name和query 整合在一块
                    // console.log(location);
                    // this.$router.push(location)

                    // console.log(this)
                    // 判断：如果路由跳转的时候带有params参数，捎带给传递过去

                }

            }

        }

    };
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

    .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
    }

    .nav {
    a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
    }
    }

    .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

    .all-sort-list2 {
    .item {
    h3 {
        line-height: 25px;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        padding: 0 20px;
        margin: 0;

    a {
        color: #333;
    }
    }

    .item-list {
        display: none;
        position: absolute;
        width: 734px;
        min-height: 460px;
        background: #f7f7f7;
        left: 210px;
        border: 1px solid #ddd;
        top: 0;
        z-index: 9999 !important;

    .subitem {
        float: left;
        width: 650px;
        padding: 0 4px 0 8px;

    dl {
        border-top: 1px solid #eee;
        padding: 6px 0;
        overflow: hidden;
        zoom: 1;

    &.fore {
         border-top: 0;
     }

    dt {
        float: left;
        width: 54px;
        line-height: 22px;
        text-align: right;
        padding: 3px 6px 0 0;
        font-weight: 700;
    }

    dd {
        float: left;
        width: 415px;
        padding: 3px 0 0;
        overflow: hidden;

    em {
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 8px;
        margin-top: 5px;
        border-left: 1px solid #ccc;
    }
    }
    }
    }
    }
    }
     // 采用css样式解决 显示与隐藏
    /*.item:hover{*/
    /*    background-color: skyblue;*/
    /*}*/
    .cur{
        background-color: skyblue;
    }
    }
    }
    // 过度动画样式
    // 过多动画开始状态（进入）
    .sort-enter{
        height: 0;
    }
    // 过渡动画的结束状态
    .sort-enter-to{
        transition: all .5s linear;
    }
    }
    }
</style>
