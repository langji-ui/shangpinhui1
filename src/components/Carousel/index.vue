<template>
    <!--轮播图的地方-->
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>


<script>
    // 引入swiper
    import Swiper from 'swiper'

    export default {
        name: "Carousel",
        props:["list"],
        watch: {
            list: {
                // 立即监听：不管数据有没有发生变化  上来 就立即监听一次
                // 为什么watch监听不到list， 因为这个数据从来没有发生过变化（数据是父亲给的，，父亲给的时候是一个对象 ，，对象里面该有的都有）
                immediate: true,
                handler() {
                    // console.log('我在监听floor组件中的list数据')
                    // 只能监听到数据已经有了，但是v-for动态宣软结构我们还是没有办法确定的，因此还是要用到nextTick
                    this.$nextTick(()=>{
                        var mySwiper = new Swiper(this.$refs.cur, {
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                // 点击小球切换图片
                                clickable: true
                            },

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        })
                    })
                }
            }
        }

    }
</script>

<style scoped>

</style>
