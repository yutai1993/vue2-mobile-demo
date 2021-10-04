<template>
  <van-action-sheet v-model="show" safe-area-inset-bottom title="商品规格" >
    <div class="sku">
      <div class="sku-content">
        <div class="sku-header">
          <div class="sku-header-img-box">
            <img src="//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg" alt="">
          </div>
          <div class="sku-header-text-box">
            <div class="sku-Price">
              <span>{{DetailItem.Price}}</span>
            </div>
            <div class="sku-number">
              <span>商品编码:{{DetailItem.code}}</span>
            </div>
            <div class="sku-header-title van-multi-ellipsis--l3">
              {{DetailItem.detailTitle}}
            </div>
          </div>
        </div>

        <div class="scrollY">
          <!--颜色-->
          <div class="sku-color" v-if="sku">
            <div class="sku-color-title">
              <span>颜色</span>
            </div>
            <div :class="['sku-color-img-box',{active:goods.color === item.text}]" v-for="item in sku.color" :key="item.id" @click="colorClick(item.text)">
              <span class="sku-color-img">
                <img src="//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg_50w_50h_4e_100Q" alt="">
              </span>
              <span class="sku-color-text">{{item.text}}</span>
            </div>

          </div>
          <!--尺码-->
          <div class="sku-color" v-if="sku">
            <div class="sku-color-title">
              <span>尺码</span>
            </div>
            <div :class="['sku-color-img-box',{active:goods.size === item.text}]" v-for="item in sku.size" :key="item.id" @click="sizeClick(item.text)">
              <span class="sku-color-text">{{item.text}}</span>
            </div>


          </div>


          <!--购买数量-->
          <div class="quantity">
            <div class="quantity-left">
              <span>购买数量</span>
            </div>
            <div class="quantity-right">
              <span>正在促销【限购2件】</span>
              <van-stepper v-model="stepperNumber" min="1" max="2" integer />
            </div>
          </div>


        </div>

        <!--立即购买 加入购物车-->
        <van-goods-action>
          <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="onvehicleClickHandle" />
          <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="onpurchaseClickHandle"/>
        </van-goods-action>



      </div>
    </div>
  </van-action-sheet>
</template>

<script>
  import Vue from 'vue';
  import { ActionSheet, Toast } from 'vant';

  Vue.use(ActionSheet);
  Vue.use(Toast)

  export default {
    name: 'sku1',
    props:{
      DetailItem:{
        type: [Object, Array]
      },
      sku:{
        type: Object
      },
      goods:{
        type:Object
      },

    },
   data(){
      return {
        show: false,
        stepperNumber:1, /*步进器*/
      }
   },

    mounted(){


    },
    methods:{

      sizeClick(text){
        this.$emit("size-click",text)
      },

      colorClick(text){
        this.$emit("color-click",text)
      },

      /* 加入购物车*/
      onvehicleClickHandle(){
        Toast("加入购物车")
      },

      /*立即购买*/
      onpurchaseClickHandle(){
        Toast("立即购买")

      },

    }

  }
</script>

<style lang="scss" scoped>


  .sku{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px 0;


  .sku-content{
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  .sku-header{
    display: flex;
    padding-bottom: 10px;

  .sku-header-img-box{
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    object-fit: cover;

  img{
    width: 100%;
    height: 100%;
  }
  }

  .sku-header-text-box{
    margin-left: 10px;
    font-size: 12px;

  .sku-Price{
    font-size: 13px;
    color: red;
  }

  .sku-number{
    color: #999;
    margin: 10px 0;
  }

  }
  }


  .scrollY{
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;
    box-sizing: border-box;

  .sku-color{

  .sku-color-title{
    margin: 15px 0 5px;
    font-size: 12px;
  }

  .sku-color-img-box{
    display: inline-block;
    align-items: center;
    padding: 3px 10px;
    box-sizing: border-box;
    font-size: 12px;
    background-color: #F2F2F2;
    border-radius: 5px;
    margin: 0 5px 5px 0;
    border: 1px solid #fff;

    &.active{
      border: 1px solid #ff4422;
    }

  .sku-color-img{
    display: inline-block;
    width: 23px;
    height: 23px;
    margin-right: 5px;
    vertical-align: middle;
  img{
    width: 100%;
    height: 100%;
    display: block;

  }
  }
  }

  }

  .quantity{
    margin-bottom: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

  .quantity-right{
    display: flex;
    align-items: center;

  span:first-child{
    color: red;
    margin-right: 3px;
  }
  }

  }

  }



  }





  }



</style>
