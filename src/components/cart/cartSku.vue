<template>
  <div class="cart-cku">
    <van-action-sheet v-model="skuShow" safe-area-inset-bottom title="商品选择">
      <div class="content">
        <div class="sku-header">
          <div class="sku-header_img-wrap">
            <img src="//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg" alt="">
          </div>
          <div class="sku-header_info">
            <p class="sku-header_info-Price">
              <span>￥</span>{{cartSku.Price}}
            </p>
            <p class="sku-header_info-stock">
              库存102件
            </p>
            <p class="sku-header_info-Selected" v-if="cartSku.selectColor">
              已选:"{{cartSku.selectColor.text}}" "{{cartSku.selectSize.text}}"
            </p>
          </div>
        </div>

        <div class="sku-body">
          <div class="sku-body-scrollY">
            <!--颜色-->
            <div class="sku-color">
              <div class="sku-color-title">
                <span>颜色</span>
              </div>
              <div :class="['sku-color-img-box',{active:selectColorIndex === index}]"
                   v-for="(item, index) in cartSku.color"
                   :key="item.id" @click="colorActive(item.id)">
              <span class="sku-color-img">
                <img src="//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg_50w_50h_4e_100Q" alt="">
              </span>
                <span class="sku-color-text">{{item.text}}</span>
              </div>

            </div>
            <!--尺码-->
            <div class="sku-color">
              <div class="sku-color-title">
                <span>尺码</span>
              </div>
              <div :class="['sku-color-img-box',{active: selectSizeIndex === index}]"
                   v-for="(item, index) in cartSku.size"
                   :key="item.id" @click="sizeActive(item.id)">
                <span class="sku-color-text">{{item.text}}</span>
              </div>


            </div>
          </div>
        </div>

        <div class="footer">
          确定
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Bas } from '../../Bas/Bas'
  import { ActionSheet } from 'vant'

  Vue.use(ActionSheet)
  export default {
    name: 'cartSku',

    props: {
      cartSku:{
        type: Object,
        default: ()=>{
          return {}
        }
      }
    },
    data () {
      return {
        skuShow: false,
        selectColorIndex: -1,
        selectSizeIndex: -1,

      }
    },

    watch:{

      cartSku(data){
         this.setSelectColorIndex(data)

      }

    },

    mounted () {

      this.setSkuShow()

    },

    methods: {

      setSelectColorIndex(data){
        let colorIndex = this.cartSku.color.findIndex((item, index)=>{
          return item.id === data.selectColor.id
        })
        this.selectColorIndex = colorIndex

        let sizeIndex = this.cartSku.size.findIndex((item, index)=>{
          return item.id === data.selectSize.id
        })
        this.selectSizeIndex = sizeIndex
      },



      colorActive(id){
        let index = this.cartSku.color.findIndex((item, index)=>{
          return item.id === id
        })
        this.selectColorIndex = index
      },

      sizeActive(id){
        let index = this.cartSku.size.findIndex((item, index)=>{
          return item.id === id
        })
        this.selectSizeIndex = index
      },


      setSkuShow (){
        Bas.$on("sku-show", ()=>{
          this.skuShow = true
        })
      }

    },



  }
</script>

<style lang="scss" scoped>

  .cart-cku {

    /deep/ .van-popup {
      height: 80%;
    }

    .van-action-sheet__content {
      height: 100%;
      flex: 1;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .content {
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;


      .sku-header {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        box-sizing: border-box;

        .sku-header_img-wrap {
          width: 98px;
          height: 98px;

          img {
            width: 100%;
            display: block;
          }
        }

        .sku-header_info {
          margin-left: 18px;

          p {
            margin: 3px 0;
            font-size: 14px;
          }

          .sku-header_info-Price {
            font-size: 20px;
            color: red;

            span:first-child {
              font-size: 12px;
              margin-right: 3px;
            }

          }

        }
      }

      .sku-body {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;

        .sku-body-scrollY {

          padding-bottom: 30px;
          box-sizing: border-box;

          .sku-color {

            .sku-color-title {
              margin: 15px 0 5px;
              font-size: 12px;
            }

            .sku-color-img-box {
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

              .sku-color-img {
                display: inline-block;
                width: 23px;
                height: 23px;
                margin-right: 5px;
                vertical-align: middle;

                img {
                  width: 100%;
                  height: 100%;
                  display: block;

                }
              }
            }

          }

        }


      }

      .footer {
        height: 45px;
        line-height: 45px;
        border-radius: 5px;
        background-color: #ff4422;
        text-align: center;
        color: white;
      }


    }

  }


</style>
