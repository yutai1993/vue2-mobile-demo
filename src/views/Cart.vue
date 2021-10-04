<template>
  <div class="Cart">
    <!--导航-->
    <van-nav-bar
      fixed
      title="购物车"
      left-arrow
      safe-area-inset-top
      @click-left="onClickLeft"
    />
    <!--顶部占位-->
    <div class="nav-plaplace"></div>

    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">


      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad"
      >

        <!-- 单条数据 传入对象 回传id -->
        <cart-list
          v-for="(item, index) in CartList"
          :key="index"
          :itemObj="item | filterCartItem"
          :index="index"
          @change-select-price="changeSelectPrice"
        ></cart-list>


      </van-list>

    </van-pull-refresh>

    <div class="order">
      <div class="total-order">
        <span>订单总额 : &yen;{{SetSelectPrice}}</span>
      </div>
      <span>生成订单</span>
    </div>

    <!--商品规格-->
    <cart-sku :cartSku="cartSku"></cart-sku>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Bas } from '../Bas/Bas'
  import { mapActions, mapState } from 'vuex'
  import { PullRefresh, Toast, List, Stepper, Tag } from 'vant'
  import CartList from '../components/cart/cartList'
  import CartSku from '../components/cart/cartSku'
  import { format } from 'mathjs'
  Vue.use(PullRefresh)
  Vue.use(Toast)
  Vue.use(List)

  export default {
    name: 'Cart',
    components: {
      CartSku,
      CartList
    },
    data () {
      return {

        isLoading: false,

        list: [],
        loading: false,
        finished: false,

        finishedText: '没有更多了',

        currentPage: 1, // 当前页码
        limit: 10, // 每页条数
        totalSize: 40, // 总条数

        selectPrice: [],

        SetSelectPrice: '0.00',

        cartSku: {},
        colorIndex: 1,
        sizeIndex: 1

      }
    },

    watch: {

      selectPrice () {

        let totalPrice,value;
        this.selectPrice.forEach((item, index) => {
          if (item.checked) {
            totalPrice += item.price * item.count
            value = format(totalPrice, 14)
          }
        })
        this.SetSelectPrice = value

      }

    },

    /*计算属性*/
    computed: {

      ...mapState(['CartList']),

    },

    mounted () {

      this.getCartIndex()



    },

    methods: {

      ...mapActions(['getCartList']),

      getCartIndex () {
        let that = this
        Bas.$on('cart-index', (index) => {
          // 获取对应的数据
          let skuObj = this.CartList[index].sku
          that.cartSku = {
            color: skuObj.color, // 颜色
            size: skuObj.size, // 尺码
            title: that.CartList[index].detailTitle, // 标题
            Price: that.CartList[index].Price, // 价格
            selectColor: skuObj.color[that.colorIndex], // 选中的颜色
            selectSize: skuObj.size[that.sizeIndex], // 选中的 尺码
          }

         // this.cartSku = skuData

        })
      },

      changeSelectPrice (data) {
        this.selectPrice.splice(data.index, 1, data)
      },

      onLoad () {

        this.getCartList({
          url: '/ajax/detail',
          data: {
            _page: this.currentPage,
            _limit: this.limit,

          },
          callBack: () => {

            // 是否在加载状态
            this.loading = false
            // 下拉刷新成功关闭提示
            this.isLoading = false
            // 当前页码加1
            this.currentPage++
            // 总页码
            let totalPage = this.totalSize / this.limit

            // 如果返回的数据为空 修改提示
            if (this.CartList.length === 0) {
              this.finishedText = '没有数据，请换个关键词'
              this.finished = true
            } else {
              this.finishedText = '没有更多了'
            }

            // 全部数据加载完成
            if (this.currentPage > totalPage || this.CartList.length < this.limit) {
              this.finished = true
            }

          }
        })

      },

      // 下拉刷新的回调
      onRefresh () {
        // 重置vuex 数组 页码
        this.currentPage = 1
        this.finished = false
        this.onLoad()

      },

      /*后退*/
      onClickLeft () {
        this.$router.back()
      }

    },

    filters: {
      filterCartItem (data) {
        // console.log(data.sku.color[Math.ceil(Math.random()*7)])
        let itemObj = {
          id: data.id,
          title: data.detailTitle, // 标题
          Price: data.Price, // 价格
          count: 1, // 选中的数量
          color: data.sku.color[1], // 选中的颜色
          size: data.sku.size[1], // 选中的尺码
        }

        return itemObj
      }
    },

  }
</script>

<style lang="scss" scoped>

  /*顶部占位*/
  .nav-plaplace {
    height: 46px;
  }


  .Cart {
    padding-bottom: 90px;
    box-sizing: border-box;

    .order {
      width: 100%;
      height: 40px;
      position: fixed;
      bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 0 10px;
      box-sizing: border-box;
      background-color: white;

      > span {
        height: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        color: white;
        font-weight: bold;
        font-size: 14px;
        background-color: #ff4422;
      }

      .total-order > span {
        color: #ff4422;
      }

    }

  }


</style>
