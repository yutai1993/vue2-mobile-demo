<template>
  <router-link tag="a" class="home-list-item-box" :to="`/detail/${item.id}`">
    <div class="home-list-item-img-box">
      <img src="../../assets/images/product.jpg" alt="">
    </div>
    <div class="home-list-item-text-box">
      <p class="home-list-item-text van-multi-ellipsis--l2">{{item.detailTitle}} </p>
    </div>
    <p><span class="nowPrice">￥{{item.Price}}</span> <span class="oldPrice">￥{{item.oldPrice}}</span></p>
    <div class="button"><van-button >立即购买</van-button></div>
  </router-link>
</template>

<script>
  import Vue from 'vue';
  import { Button } from 'vant';

  Vue.use(Button);

  export default {
    name: 'homeListItem',
    props:{
      item:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },

    mounted () {



    },

  }
</script>

<style lang="scss" scoped>
  .home-list-item-box{
    width: 48%;
    display: inline-block;
    margin-top: 10px;
    flex-shrink: 0;
    border: 1px solid #ddd;
    img{
      width: 100%;
    }
    .home-list-item-text-box{
      .home-list-item-text{
        margin-top: 0;
        padding: 0 10px;
        box-sizing: border-box;
        color: #8f8f94;
      }
    }
    p:last-of-type, .button{
      text-align: center;
    }
    .nowPrice, .oldPrice{
      font-size: 12px;
    }
    .nowPrice{
      color: red;
    }
    .oldPrice{
      color: #ccc;
      text-decoration: line-through;
    }
    .van-button{
      background-color: $nav-Back-Color;
      color: white;
      height: 37px;
      margin-bottom: 10px;
    }
  }
</style>
