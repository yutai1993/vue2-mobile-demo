<template>
  <div class="cart-list">
    <div class="cart-list-item-box">
      <van-checkbox v-model="checked"></van-checkbox>
      <div class="cart-list-item">
        <div class="cart-list-item-center">
          <img src="//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg" alt="">
        </div>
        <div class="cart-list-item-right">
          <!--右侧商品名称-->
          <div class="cart-list-item-right-title">
            <span>{{itemObj.title}}</span>
          </div>
          <!--右侧中间标签-->
          <p class="cart-list-item-right-tag">
            <span  @click="onTapTagHandle">
              <van-tag round type="primary">
                {{itemObj.color.text}},{{itemObj.size.text}}
                <!--小三角-->
                <div class="arrow-xia">
                <span class="arrow-box">
                <span class="arrow"></span>
                <span class="arrow1"></span>
              </span>
                </div>

              </van-tag>
            </span>

          </p>
          <!--右侧最下面一行-->
          <div class="cart-list-item-right-Price">
            <!--价格-->
            <div class="cart-list-item-right-Price-left">
              <span>&yen;{{itemObj.Price}}</span>
            </div>
            <!--步进器-->
            <div class="cart-list-item-right-Price-right">
              <van-stepper v-model="value" theme="round" button-size="22" disable-input />
            </div>

          </div>
        </div>
      </div>
    </div>

<!--    <cart-sku></cart-sku>-->

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Bas } from '../../Bas/Bas'
  import {Checkbox, CheckboxGroup, Icon, Stepper, Tag } from 'vant'
  // import CartSku from './cartSku'
  Vue.use(Stepper);
  Vue.use(Tag);
  Vue.use(Icon);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  export default {
    name: 'cartList',
    // components: { CartSku },
    props:{
      itemObj:{
        type: Object
      },

      index:{
        type: [String, Number]
      }

    },


    data(){
      return {
        // show:false,
        checked: false,
        /*步进器*/
        value: this.itemObj.count,
      }
    },

    watch:{

      checked(){
        this.selectedItem()
      },

      value(){
        console.log(this.value)
        this.selectedItem()
      },

    },

    mounted () {

    },

    methods:{

      selectedItem(){

        let priceCount = {
          price: this.itemObj.Price,
          count: this.value,
          index: this.index,
          checked: this.checked
        };

        this.$emit("change-select-price",priceCount)

      },


      onTapTagHandle(){
        Bas.$emit("cart-index", this.index)
        Bas.$emit("sku-show")

      }

    },

  }
</script>

<style lang="scss" scoped>

  /deep/ .van-tag{
    position: relative;
    padding: 0 20px 0 5px;
  }

  .arrow-xia{
    position: absolute;
    top: 3px;
    right: 3px;
  }

  .arrow-box{
    width: 10px;
    height: 10px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    .arrow, .arrow1{
      width: 0;
      height: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      font-size: 0;
      border-width: 5px;
      border-style: solid;
      border-color: #999 transparent transparent transparent;
      position: absolute;
      top: 0;
      left: 0;
    }
    .arrow1{
      top: -2px;
      border-style: solid;
      border-color: #1989fa transparent transparent transparent;
    }
  }

  .cart-list{
    padding: 0 10px;
    box-sizing: border-box;
    .cart-list-item-box{
      margin-top: 10px;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid #006699;
      background-color: #fefbee;
      display: flex;
      align-items: center;

      /deep/ .van-checkbox__icon{
        margin-right: 10px;
      }

      .cart-list-item{
        width: 100%;
        display: flex;
        justify-content: space-between;
        overflow: hidden;


        P{
          margin: 0;
        }

        .cart-list-item-center{
          width: 95px;
          margin-right: 10px;
          flex-shrink: 0;
          img{
            width: 100%;
            display: block;
          }
        }
        /*右侧*/
        .cart-list-item-right{
          width: 100%;
          overflow: hidden;
          .cart-list-item-right-title{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          /*tag标签*/
          .cart-list-item-right-tag{
            margin-top: 10px;
          }
          /*最下面一行*/
          .cart-list-item-right-Price{
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .cart-list-item-right-Price-left{
              color: red;
            }

          }

        }


      }

    }


  }

</style>
