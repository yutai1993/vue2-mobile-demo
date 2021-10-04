<template>
  <div class="detail">

    <!--导航-->
    <van-nav-bar
      fixed
      title="商品详情"
      left-arrow
      safe-area-inset-top
      @click-left="onClickLeft"
    />
    <!--顶部占位-->
    <div class="nav-plaplace"></div>

    <!--轮播图-->
    <van-swipe :height="200" @change="onChange">
      <van-swipe-item v-for="(image, index) in DetailItem.Rotation" :key="index">
        <img v-lazy="image.imgUrl"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{DetailItem.Rotation && DetailItem.Rotation.length}}
        </div>
      </template>

    </van-swipe>

    <div class="content">
      <div class="title">
        <div class="price">
          <span>{{ DetailItem.Price | filterPrice(1)}}</span>
          <i>.{{ DetailItem.Price | filterPrice(2)}}</i>
        </div>
        <div class="group">
          <span class="group-border">2人团</span>
          <span class="group-border">包邮</span>
          <span>已拼39件</span>
        </div>
        <div class="title-text-box">
          <div class="title-text">
            <p class="p-1">{{DetailItem.invitation}}</p>
            <div class="follow-box">
              <p class="p-2 van-multi-ellipsis--l3">{{DetailItem.detailTitle}}</p>
              <div class="title-follow">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAhFBMVEUAAABmZmZpaWlmZmZoaGhnZ2dra2toaGh0dHRmZmZnZ2doaGhpaWlnZ2dmZmZ2dnZnZ2dnZ2dmZmZqampmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZnZ2dmZmZoaGhnZ2dmZmZmZmZmZmZnZ2doaGhnZ2dnZ2dnZ2doaGhmZmZpaWlmZmZmZmajHyRjAAAAK3RSTlMA9g78GFcTOAS3pFEtvewIlop1HeJb8p9pMtmZeU1H6cmtgSZiznBBwTuPDzkIqwAAAi9JREFUSMftltuSojAQhgnhLAjKGREBz/u///ttQkoWmXJsudqamu+iO2n9tdPpELQfiNM0zmKxC7hLtRcILsu0cYaqQhYvTfp6XZi4CeSalgPm51rrgIP1cJ8RpwGQylEKBCl93Ya5q4BxsS4E1c40KOm6GMhyXQX0PMNA8D79HQDm1rYzaTS7dhlk/d4RAKYQznFMyqalQBt+DYetLCAlb+9r1AN2lKN0A+p5sAZuDqk9EvD9c2jPkRBbxc9mx8ESAV8jsp8l7stUyHD02pRrSdfqwFZbSgycnmto0cU+sFKtESotY3T1FbgK13Scd40Y2IBw9GqXcZ9gIOljn/44Uf3NAbA8ZwD4TdaAig3JudBF4YszJHeNzIato3Fry2jNNh9dNPPpL7+MhLryR1ubcT++7azz43qrlDfavaaoPMKBOklXSifRO35Ro4Jbb9VdFkubjO28RaQWtE6/FVq+7zftXhgeiaGloqc+ZhI+2O71u9MThSyCIXPfSthN2tUrsWEPnM/KS90uGYu8Jh3q1p38Xru2PxInu+nGu8yniEN9wOIbXREO0YL0zxFmRI9PikDAE2njF+LSHHA599SoVMpCSz0Bq6Q1vu/ugxcl4XQe0Qu25UeDRdrICT5ZfOGi1ib/98UqoG6VEyF35Drhxo97a0UTW3WCXg2bQ1YPvR2II6IbknU0uBfanvHuPraWx+XKS9TypXuC9eIs/zlOp8e8F0buTbma8F9cPX8BRTk4ibXjWXIAAAAASUVORK5CYII="
                  alt="">
              </div>
            </div>
            <p class="p-3">{{DetailItem.upper}}</p>
            <p class="p-4"><span>享退货运费险</span></p>
          </div>

        </div>
      </div>
      <!--空 占位-->
      <div class="kong"></div>

      <!--会员优惠-->
      <div class="member">
        <div class="member-img-box">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAeCAMAAAD6p9sIAAAAn1BMVEUAAAA4O3g4O3g3Ong4Onk9PXo3Onf/34P32YKShn3Fr3/01oN6cnuOgnw/QXdXVXlISHj83YPrz4Kjk348PnjMtYCajX1QT3k5PHdDRHjexIHWvYCWiX3pzYLhxoHawYHCrX+zoX6BeHuqmX5uaHpnYnpjX3r62oPx1IK4pX+LgHxLS3i+qn93b3vQuYGHfXxeWnrv0oLkyYGej32xn3/8QoNfAAAABnRSTlMA88i9ZRljrLGUAAACiElEQVRIx72X6XKiQBSF1ST3ABIQBVlE2RfF3bz/s003AsOASaypku+Pda5tf3Tbt6oZMd4nY3o548n7iPPxRgPx9sF0g9mYj+0kDcj7aEIDMhl1TollWPQ6xqNOQZkr9EK6uvByopfR112x/regBs5U2OwTYhykfV3eSjLPJdtFqBNjLzWkTdreksc6XY62rgfH3UayXhddVHyxIGJa1+dY8lyz5nMKaDi0k6E80KkeICzCVbjIAE+9F2UgOJhFbAC7RzpBZpwiAXObCwK5omjSzgeCvi4RAEc1c+TmecPEyX3PIBHHOsLp65qcajhxwSfVtJKEzOrqdK4waQVgRSZTb3RirOonO+S5/b2OHETf6g6A2tW5AESKwYnL5BIjwjSmmh903g+6HQSlq+PLMimoToVaLpKhzoHjrvhNZ2bYcYE7u2O3dLYDibq6KZATGeAYPFYzqWXp+Dn7Rqcy0tMVU7N9Flelzlgwjhr8oqcTgCtbYz14DQh0xxR5VVj82AiCXM6hCXeO7bZwZv2+cwBNpz04e1I0wKGGYucB24e6NcPzF2zG/n8nLZfLm5Fheu7pFgBkCsEJy0++HPt8tprvz6ysWfVknT6sdf1UZPjq6WYXfvYtD4BnKRvgwh9YBZKqUaYQKQXMajgQP6mjAPN+m8sAfCXVoKWKXy6Vc0FQ6QScyNZwq/tGmz2rCwGrp2OKNtXhjYCbzTY1NqCpfEszkbW/9Skgogc6UanQW7oEMLs6E11UYlgGoK2vYPAf6x6Lmw0/SMojXYPf0tkZxN7qpI7NqMa663uMy2iJORi5q9PTOvKxaXRj+o0ijVX7b5ylyYz+k/HAV6OBL37DXmuHvrQP/EryB3WbcC8nwSSZAAAAAElFTkSuQmCC"
            alt="">
          <span>开通会员预计可省</span><i style="color: red;font-weight: 700;">{{DetailItem.Rebate}}元</i>
        </div>
        <div class="member-right" @click="menubarClickHandle">
          <span>查看详情</span>
          <van-icon name="arrow" color="#999" size="18"/>
        </div>
      </div>

      <!--空 占位-->
      <div class="kong"></div>

      <!--可参加的优惠-->
      <div class="Discount-box" @click="DiscountClickHandle">
        <div class="Discount">
          <div class="Discount-img-box">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAb1BMVEUAAAD/VwD/VQD/VQD/VQD/VQD/VgD/VQD/VgD/VQD/VgD/VgD/YgD/XQD/VQD/VgD/VQD/WAD/VQD/VgD/VgD/VgD/VgD/VgD/VwD/VQD/VgD/VQD/WQD/VQD/VgD/ZgD/VQD/VgD/VgD/VQD/VgCYqQihAAAAJXRSTlMAJnS62fIx/4/woFEND/mJ5jcdTJlGQO4s9KY7FbO4CsVi0NvNV5jhwAAAAPFJREFUeAF9kgV2AyEURR98hjfuPkN9/1tsG3LiCfcYfDecUFpMFBnRCrdY4RmxuCImkzRTea6yNCFjnCiEZVWcf1VJOf2EdYMrmppyila3uKGtjzEtywZ3NCWtD1fhgYoCKCYFHigSKmim6Fp42n446VJqCLOR0+yz1iw7AHNvkVFgqNrE19gtXFgOwMoVigYRc2wLza5Jt79xGeHokDPyKowla7IC3j+4bCeVoQLQlSw/fWlfTAydDyjMAGBwGzz7N0mHjOKLP2NX5368KqW+bbnnkdW3fDOoeXUH1rmiBMYbWEpglYEDCJxN6NgCJ/oHttsO/imVh+0AAAAASUVORK5CYII="
              alt="">
            <span> 可参加以下优惠活动</span>
          </div>
          <div class="Discount-right">
            <span>查看详情</span>
            <van-icon name="arrow" color="#999" size="18"/>
          </div>
        </div>
        <div class="Promotion">
          <div class="Promotion-left">
            <span>促销</span>
          </div>
          <div class="Promotion-right">
            <p v-for="Discount in DetailItem.Discount" :key="Discount.id">
              <span>{{Discount.title}}</span>
              <i>{{Discount.text}}</i>
            </p>
          </div>
        </div>
      </div>

      <!--空 占位-->
      <div class="kong"></div>

      <div class="choice">
        <!--已选-->
        <div class="choice-item" @click="choiceClick">
          <div class="choice-item-left">
            <span>已选</span> <span>{{goods.color}},{{goods.size}} {{goods.num}}件</span>
          </div>
          <van-icon name="arrow" color="#999" size="18"/>
        </div>

        <!--付款-->
        <div class="payment">
          <div class="choice-item-left">
            <span>付款</span>
            <span v-for="payment in DetailItem.payment" :key="payment.id">{{payment.text}}</span>
          </div>
        </div>


      </div>

      <div class="padding"></div>

    </div>

    <!--商品规格-->
    <sku1 :DetailItem="DetailItem" :sku="DetailItem.sku" ref="sku" :goods="goods" @color-click="colorClick" @size-click="sizeClick"></sku1>


    <!-- 以下为 SUPER会员优惠动作弹窗 -->
    <van-action-sheet v-model="menubarShow" safe-area-inset-bottom title="SUPER会员给你更好的">

      <div class="ActionSheet-content">
        <van-notice-bar
          left-icon="bell"
          :scrollable="false"
          text="实际优惠金额以结算页下单金额为准。"
        />

        <div class="Rebate">
          <div class="left">
            额外返云钻（最高返20倍）
          </div>
          <div class="right">
            <span>可反</span>
            <i style="color: red;">2.47元</i>
          </div>
        </div>

        <div class="text">
          SUPER会员完成本单交易，预计可额外返云钻:247，可在下次购物时抵现
        </div>

      </div>
      <div class="footer">
        <p>立即开通SUPER会员</p>
        <p>本单预计可优惠2.47元</p>
      </div>
    </van-action-sheet>
    <!--优惠动作弹窗-->
    <van-action-sheet v-model="DiscountShow" safe-area-inset-bottom title="优惠">
      <div class="Discount-ActionSheet">

        <div class="Discount-img-box">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAb1BMVEUAAAD/VwD/VQD/VQD/VQD/VQD/VgD/VQD/VgD/VQD/VgD/VgD/YgD/XQD/VQD/VgD/VQD/WAD/VQD/VgD/VgD/VgD/VgD/VgD/VwD/VQD/VgD/VQD/WQD/VQD/VgD/ZgD/VQD/VgD/VgD/VQD/VgCYqQihAAAAJXRSTlMAJnS62fIx/4/woFEND/mJ5jcdTJlGQO4s9KY7FbO4CsVi0NvNV5jhwAAAAPFJREFUeAF9kgV2AyEURR98hjfuPkN9/1tsG3LiCfcYfDecUFpMFBnRCrdY4RmxuCImkzRTea6yNCFjnCiEZVWcf1VJOf2EdYMrmppyila3uKGtjzEtywZ3NCWtD1fhgYoCKCYFHigSKmim6Fp42n446VJqCLOR0+yz1iw7AHNvkVFgqNrE19gtXFgOwMoVigYRc2wLza5Jt79xGeHokDPyKowla7IC3j+4bCeVoQLQlSw/fWlfTAydDyjMAGBwGzz7N0mHjOKLP2NX5368KqW+bbnnkdW3fDOoeXUH1rmiBMYbWEpglYEDCJxN6NgCJ/oHttsO/imVh+0AAAAASUVORK5CYII="
            alt="">
          <span>可参加以下优惠活动</span>
        </div>

        <div class="Promotion-box">
          <div class="Promotion">
            <p>促销</p>
          </div>

          <div class="Promotion-content">
            <div class="Promotion-content-first-left">
              <span>云钻促销</span>
            </div>
            <div class="Promotion-content-first-right">
              <p>普通会员预计返12云钻</p>
              <p>通过购物、评价、打卡、云钻游戏等获得的云钻，可兑换商品、券、玩游戏、还可购物抵现</p>
            </div>
          </div>

          <div class="Promotion-content-last">
            <div class="Promotion-content-last-left">
              <span>实名领卷</span><i>领10元无门槛支付券</i>
            </div>
            <div class="Promotion-content-last-right">
              <van-icon name="arrow" color="#999" size="18"/>
            </div>
          </div>

          <!--卷-->
          <div class="volume">
            <div class="volume-title">
              <span>我的云钻:0</span>
            </div>

            <div class="volume-content-box">
              <div class="volume-content-img-box">
                <img src="../assets/images/newdefaultquancur.png" alt="">
              </div>
              <div class="volume-content-text">
                <p><span class="left active">云钻刮券</span><span class="right">200云钻</span></p>
                <p><span class="left">100%刮中券，最高50元无敌券</span><span class="right">登录立即刮券</span></p>
              </div>
            </div>


          </div>

        </div>

      </div>
    </van-action-sheet>

    <div class="loading" v-show="loadingShow">
      <van-loading type="spinner" size="24px"  color="#000" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Icon, Stepper, Sku, NoticeBar, Swipe, SwipeItem, Lazyload, Toast } from 'vant'
  import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
  import {mapState, mapActions} from 'vuex'
  import Sku1 from '../components/Detail/sku1'

  Vue.use(GoodsAction);
  Vue.use(GoodsActionButton);
  Vue.use(GoodsActionIcon);
  Vue.use(Swipe)
  Vue.use(SwipeItem)
  Vue.use(Icon)
  Vue.use(NoticeBar)
  Vue.use(Stepper)
  Vue.use(Toast)
  Vue.use(Lazyload)
  export default {
    name: 'Detail',
    components: { Sku1  },
    data () {
      return {
        show:false,
        current: 0,
        menubarShow: false,
        DiscountShow: false,

        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],

        /*商品规格所需 开始*/


        // 选中的
        goods:{
          // 商品编码
          code: "4567098765467",
          // 颜色
          color: "徕卡款",
          // 尺码
          size: "39码",
          // 选中的数量
          num: "1"
        }

        /*商品规格所需 结束*/

      }
    },

    computed:{
      ...mapState(["DetailItem","loadingShow"])
    },

    mounted () {
      this.getDetailItem({
        url:`/ajax/detail/${this.$route.params.id}`,
      })
    },

    methods: {
      ...mapActions(["getDetailItem"]),



      /* 商品规格*/
      colorClick(text){
        this.goods.color = text
      },

      sizeClick(text){
        this.goods.size = text

      },

      // 弹出商品规格
      choiceClick(){
        this.$refs.sku.show = !this.$refs.sku.show

      },


      /*可参加的优惠*/
      DiscountClickHandle () {
        this.DiscountShow = true

      },

      /* 会员优惠点击事件 弹出 */
      menubarClickHandle () {
        this.menubarShow = true
      },

      /*轮播自定义指示器*/
      onChange (index) {
        this.current = index
      },

      /*后退*/
      onClickLeft () {
        this.$router.back()
      }

    },
    filters:{
      filterPrice(data,index){
        if (data){
          let arr = data.toString().split(".");
          if (index === 1){
            return arr[0]
          }
          if (index === 2){
            return arr[1]
          }
        }

      }
    },

    beforeDestroy () {
      this.$store.state.DetailItem = []
    }
  }
</script>

<style lang="scss" scoped>

  .loading {
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 999;
    margin-top: -12px;
    margin-left: -12px;
  }

  /deep/ .van-popup{
    height: 80%;

    .van-action-sheet__content {
      height: 100%;
      flex: 1;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;




    }

  }


  .padding{
    height: 50px;
  }


  /*占位*/
  .nav-plaplace {
    height: 46px;
  }

  .kong {
    width: 100%;
    height: 8px;
    background-color: #F2F2F2;
  }

  .detail {
    padding-bottom: 50px;
    box-sizing: border-box;
  }

  /*轮播*/
  .van-swipe {
    img {
      width: 100%;
      height: 100%;
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }

  }

  .content {
    box-sizing: border-box;

    .title {
      padding: 15px 10px 0 10px;

      .price {
        font-size: 23px;
        color: red;

        span {

        }

        i {
          font-size: 17px;

        }

      }

      .group {
        span {
          margin-right: 5px;
          font-size: 12px;
        }

        .group-border {
          border: 1px solid #E9B354;
          padding: 2px 5px;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #fefbee;
        }
      }

      .title-text-box {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .title-text {
          margin-top: 5px;

          p {
            margin: 5px 0 0 0;
          }

          .p-1, .p-4 {
            font-size: 12px;
          }

          .p-1, .p-3 {
            color: #999;
          }

          .p-2 {
            font-size: 15px;
            font-weight: 700;
          }

          .p-3 {
            font-size: 13px;
            margin: 8px 0;
          }

          .follow-box {
            display: flex;

            .title-follow {
              margin: 5px 0 0 5px;
              flex-shrink: 0;

              img {
                width: 34px;
              }
            }
          }

          .p-4 {
            margin-bottom: 8px;

            span {
              border: 1px solid #E9B354;
              background-color: #ffece8;
              padding: 0 3px;
              color: #f42;
              border-radius: 3px;
            }
          }

        }
      }

    }

    .member {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      box-sizing: border-box;
      font-size: 12px;

      .member-img-box {
        display: flex;
        align-items: center;

        img {
          height: 14px;
          margin-right: 5px;
        }
      }

      .member-right {
        display: flex;
        align-items: center;

        span {
          margin-right: 5px;
        }
      }

    }

    .Discount-box {

      .Discount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        box-sizing: border-box;
        font-size: 12px;

        .Discount-img-box {
          display: flex;
          align-items: center;

          img {
            height: 14px;
            margin-right: 2px;
          }
        }

        .Discount-right {
          display: flex;
          align-items: center;

          span {
            margin-right: 5px;
          }
        }

      }

      .Promotion {
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 12px;
        display: flex;

        p {
          margin: 0;
        }

        .Promotion-left {
          margin-right: 10px;

          span {
            color: #999;
          }
        }

        .Promotion-right {

          p:last-child {
            margin: 5px 0;
          }

          p {
            span {
              border: 1px solid #E9B354;
              background-color: #fefbee;
              margin-right: 5px;
              padding: 0 5px;
              border-radius: 5px;
              box-sizing: border-box;
            }
          }
        }

      }

    }

    .choice {
      padding: 0 10px;
      box-sizing: border-box;
      margin-top: 10px;

      .choice-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .choice-item-left {
          font-size: 12px;

          span:first-child {
            color: #999;
            margin-right: 10px;

          }

          span:last-child {
            font-weight: bold;
          }

        }

      }

      .payment {
        margin: 10px 0;

        .choice-item-left {
          display: flex;
          font-size: 12px;

          span {
            margin-right: 10px;
          }

          span:first-child {
            color: #999;
          }


        }
      }

    }


  }


  /*优惠动作弹窗*/
  .Discount-ActionSheet {
    padding: 5px 10px 200px;

    .Discount-img-box {
      font-size: 12px;
      display: flex;
      align-items: center;

      img {
        width: 12px;
        margin-right: 2px;
      }
    }

    .Promotion {
      font-size: 12px;

      p:first-child {
        color: #999;
        font-size: 13px;
      }
    }

    .Promotion-content {
      font-size: 12px;
      display: flex;

      p {
        margin: 0;
      }

      .Promotion-content-first-left {
        flex-shrink: 0;
        margin-right: 5px;

        span {
          padding: 0 5px;
          box-sizing: border-box;
          background-color: #fefbee;
          border: 1px solid #E9B354;
          border-radius: 5px;
        }
      }

      .Promotion-content-first-right {
        p:last-child {
          margin-top: 2px;
        }
      }

    }

    .Promotion-content-last {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-top: 2px;
      color: #222;
      justify-content: space-between;

      .Promotion-content-last-left {
        span {
          padding: 0 5px;
          box-sizing: border-box;
          border: 1px solid #E9B354;
          background-color: #fefbee;
          margin-right: 5px;
        }
      }

    }

    .volume-title {
      font-size: 12px;
      margin: 10px 0;
    }

    .volume-content-box {
      position: relative;

      .volume-content-img-box {
        width: 100%;
        height: 80px;
        position: absolute;
        top: 0;
        left: 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .volume-content-text {
        position: relative;
        height: 80px;

        p {
          margin: 0;
          font-size: 12px;
          color: white;
        }

        p:first-child {
          padding-top: 20px;
        }

        .left {
          display: inline-block;
          width: 73%;
          padding-left: 15px;
          box-sizing: border-box;
        }

        .right {
          display: inline-block;
          width: 27%;
          text-align: center;
        }

        .active {
          font-size: 17px;
        }

      }

    }


  }


  /*以下为 会员优惠 弹窗的样式 开始*/
  .ActionSheet-content {
    padding: 5px 10px 200px;

    .van-action-sheet__header {
      font-weight: 700;
    }

    .van-notice-bar {
      color: #f50;
      background-color: #fff5ee;
    }

    .Rebate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      margin: 10px 0;

      .left::before {
        content: "";
        display: inline-block;
        background-color: #ff4422;
        width: 3px;
        padding: 5px 0;
        box-sizing: border-box;
      }

    }

    .text {
      font-size: 12px;
      background-color: #F2F2F2;
      padding: 10px;
      box-sizing: border-box;
    }

  }

  .footer {
    font-size: 12px;
    text-align: center;
    background-color: #f50;
    border-radius: 5px;
    margin: 0 10px 10px;

    p {
      margin: 0;
      color: white;
    }
  }

  /*会员优惠 弹窗的样式 结束*/


</style>
