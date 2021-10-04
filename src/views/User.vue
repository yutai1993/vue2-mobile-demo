<template>
<div class="user">
  <!--导航-->
  <van-nav-bar
    title="个人中心"
    left-arrow
    safe-area-inset-top
    @click-left="onClickLeft"
  />

  <div class="user-info">
    <div class="user-info-img-box">
      <img src="../assets/images/user.jpg" alt="">
    </div>
    <div class="user-info-text-box">
      <div class="user-info-text">
       <p>itcast</p>
       <p>绑定手机: <span>1537698635655</span></p>
     </div>
      <div class="user-info-icon">
        <van-icon name="arrow" color="#999" size="20px" />
      </div>
    </div>

  </div>

  <div class="user-install">
    <router-link class="user-install-item" to="">
      <span class="user-install-item-left">
        <span>账号与安全</span>
      </span>
      <span class="user-info-icon">
        <van-icon name="arrow" color="#999" size="20px" />
      </span>
    </router-link>
    <router-link class="user-install-item" to="">
      <span class="user-install-item-left">
        <span>我的购物车</span>
      </span>
      <span class="user-info-icon">
        <van-icon name="arrow" color="#999" size="20px" />
      </span>
    </router-link>
    <router-link class="user-install-item" to="">
      <span class="user-install-item-left">
        <span>收货地址管理</span>
      </span>
      <span class="user-info-icon">
        <van-icon name="arrow" color="#999" size="20px" />
      </span>
    </router-link>

    <div class="btn">
      <van-button type="default">退出登录</van-button>
    </div>

  </div>

</div>
</template>

<script>
  import Vue from 'vue';
  import { Icon,Button } from 'vant';

  Vue.use(Icon);
  Vue.use(Button);
  export default {
    name: 'User',
    data(){
      return {

      }
    },
    mounted () {

    },

    methods:{

      // 导航左侧后退
      onClickLeft () {
        this.$router.back()
      },
    },

  }
</script>

<style lang="scss" >



  .user{

    .user-info{
      padding: 0 10px 5px;
      margin-top: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      display: flex;
      .user-info-img-box{
        width: 70px;
        height: 70px;
        flex-shrink: 0;

        img{
          width: 100%;
          display: block;
        }
      }

      .user-info-text-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;


        .user-info-text{
          height: 100%;
          display: flex;
          padding: 10px 0;
          box-sizing: border-box;
          flex-direction: column;
          justify-content: space-between;

          p{
            margin: 0;
          }
        }

      }

    }

    .user-install{

      .user-install-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;

        span,a{
          color: #222222;
        }
      }

     .btn{
       padding: 10px;
       box-sizing: border-box;
       .van-button{
         display: block;
         width: 100%;
       }
     }

    }


  }


</style>
