<template>
  <div id="app">
    <router-view/>

    <van-tabbar
      route
      fixed
      v-show="hideshow">

      <van-tabbar-item  to="/" icon="wap-home">
        首页
      </van-tabbar-item>

      <van-tabbar-item  to="/Category" icon="wap-nav">
        分类
      </van-tabbar-item>

      <van-tabbar-item  to="/cart" icon="shopping-cart">
        购物车
      </van-tabbar-item>

      <van-tabbar-item  to="/user" icon="manager">
        会员中心
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Tabbar, TabbarItem } from 'vant';

  Vue.use(Tabbar);
  Vue.use(TabbarItem);

  export default {
    data(){
      return {
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hideshow:true,  //显示或者隐藏footer
      }
    },

    //监听
    watch:{
      showHeight:function() {
        if(this.docmHeight > this.showHeight){
          this.hideshow=false
        }else{
          this.hideshow=true
        }
      }
    },

    mounted () {

      // window.onresize监听页面高度的变化
      window.onresize = ()=>{
        return(()=>{
          this.showHeight = document.body.clientHeight;
        })()
      }

    },


    methods:{

    }

  }
</script>

<style lang="scss">

  html,body{
    width: 100%;
    height: 100%;
  }

#app {
  height: 100%;

  .van-tabbar-item{
    color: white;
  }

  .van-tabbar-item--active {
    color: orange;
    background-color: $nav-Back-Color;
  }

  .van-tabbar {
    background-color: $nav-Back-Color;
  }

}


</style>
