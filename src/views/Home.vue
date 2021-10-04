<template>
  <div class="home">
    <!--导航-->
    <van-nav-bar
      :fixed="true"
      safe-area-inset-top
      title="云购"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="20" color="#fff"/>
      </template>
    </van-nav-bar>
    <!--轮播图-->
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <van-swipe :autoplay="3000" :height="225">
          <van-swipe-item v-for="(image, index) in Rotation" :key="index">
            <img v-lazy="image.imgUrl"/>
          </van-swipe-item>

        </van-swipe>

        <!--分类-->
        <li class="ct-nav-box border-bottom" >
          <router-link class="ct-nav-item" to=""
          v-for="item in ctnav" :key="item.id">
<!--            <img :src="item.imgUrl" alt="">-->
            <img :src="item.imgUrl" alt="">

          </router-link>

        </li>
        <!--商品-->
        <home-list :list="DetailList"></home-list>

      </ul>
    </div>

    <div class="loading" v-show="loadingShow">
      <van-loading type="spinner" size="24px"  color="#000" />
    </div>
  </div>
</template>

<script>

  import BetterScroll from 'better-scroll'
  import Vue from 'vue'
  import { Loading, Icon, Swipe, SwipeItem, Lazyload ,Toast} from 'vant'

  Vue.use(Icon)
  Vue.use(Swipe)
  Vue.use(SwipeItem)
  Vue.use(Lazyload)
  Vue.use(Loading);


  import HomeList from '../components/homeList/homeList'
  import {mapActions,mapState} from 'vuex';
  export default {
    name: 'Home',
    components: { HomeList },
    data () {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
      }
    },

    computed:{

      ...mapState(['Rotation','ctnav',"DetailList","loadingShow"])


    },



    mounted () {
     /*轮播*/
      this.getRotation()
      // 分类
      this.getctnav()
      // 列表
      this.getDetail()


      // 初始化过早 高度计算错误 不能滚动
     setTimeout(()=>{
       let scroll = new BetterScroll(this.$refs.wrapper,{
         click: true,
         swipeTime: 1000 // 关键代码 区域滚动的流畅性 (默认值2500ms 慢)
       })
     },1000)

    },


    methods: {

      ...mapActions(["getRotation","getctnav","getDetail"]),

      onClickRight () {
        this.$router.push('/search')
      },

    },

  }
</script>

<style lang="scss">

  .loading {
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 999;
    margin-top: -12px;
    margin-left: -12px;
  }

  .home {
    height: 100%;
    padding-bottom: 50px;
    padding-top: 46px;
    box-sizing: border-box;


    .wrapper {
      height: 100%;
      overflow: hidden;

      .van-swipe {
        img {
          width: 100%;
          height: 100%;
        }

        .van-swipe__indicator {
          background-color: #aaa;
        }

        .van-swipe__indicator--active {
          background-color: $nav-Back-Color;
        }

      }

      .content{
        .ct-nav-box{
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          /*border-bottom: 1px solid #ddd;*/

          .ct-nav-item{
            width: 33.33%;
            display: inline-block;

            img{
              width: 100%;
              display: block;
            }
          }
        }
      }
    }



  }



</style>
