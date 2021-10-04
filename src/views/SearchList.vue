<template>
  <div class="SearchList">
    <!--导航-->
    <van-nav-bar
      fixed
      safe-area-inset-top
      title="搜索列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="nav-plaplace"></div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <!--    <p>刷新次数: {{ count }}</p>-->

      <van-list
        offset="100"
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad"
      >
        <!--      <van-cell v-for="item in list" :key="item" :title="item" />-->
        <form-search @search-tab="searchTabHabdle" v-model="value"></form-search>

        <div class="nav-cat">
          <div :class="['nav-cat-box',{active:activeIndex === index }]"
               v-for="(item, index) in navCat" :key="item.text" @click="navCatClickHandle(index)">
            <span>{{item.text}}</span>
            <van-icon :class="{desc: descIndex === index}" name="arrow-down" size="12"/>
          </div>
        </div>

        <home-list :list="SearchList"></home-list>
      </van-list>

    </van-pull-refresh>


  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { Icon, List, Cell, PullRefresh, Toast } from 'vant'

  import HomeList from '../components/homeList/homeList'
  import FormSearch from '../components/Search/formSearch'

  Vue.use(List)
  Vue.use(PullRefresh)
  Vue.use(Cell)
  Vue.use(Toast)
  Vue.use(Icon)
  export default {
    name: 'SearchList',
    components: {
      HomeList,
      FormSearch
    },

    data () {
      return {
        count: 0,
        isLoading: true,

        finishedText: '没有更多了',

        value: '',// 关键字查询

        list: [],
        loading: false,
        finished: false,

        /*分类排序*/
        navCat: [
          {
            text: '上架时间',
          },
          {
            text: '价格',
          },
          {
            text: '销量',
          },
          {
            text: '折扣',
          }
        ],
        activeIndex: 0,
        descIndex: 0,
        sort: 'timeDate', // 排序关键字
        order: '', // 升序  asc降序

        currentPage: 1, // 当前页码
        limit: 10, // 每页条数
        totalSize: 40, // 总条数

      }
    },

    computed: {

      ...mapState(['SearchList']),

    },

    created () {
      this.value = this.$route.query.key
    },

    mounted () {
      this.onLoad()
    },

    methods: {

      ...mapActions(['getSearchList', 'RefreshSearchList']),

      // 点击搜索
      navCatClickHandle (index) {
        this.activeIndex = index
        // 控制展示样式
        if (this.descIndex === index){
          this.descIndex = -1
          this.order = 'desc'
        }else {
          this.descIndex = index
          this.order = 'asc'
        }

        // 排序关键字
        if (index === 0) {
          this.sort ='timeDate'
        }
        if (index === 1) {
          this.sort ='Price'
        }
        if (index === 2) {
          this.sort =''
          Toast("为实现")
        }
        if (index === 3) {
          this.sort =''
          Toast("为实现")
        }

        this.currentPage = 1
        this.onLoad()

        console.log(`索引${index}====页码${this.currentPage}===排序关键字${this.sort}排序${this.order}`)
        // Toast(`索引${index}===排序关键字${this.sort}排序${this.order}`)

      },

      // ajax
      onLoad () {
        // 异步更新数据

        let { currentPage, limit, totalSize } = this
        let that = this
        // 计算总页码
        let totalPage = totalSize / limit

        // 是否在加载状态
        this.loading = true
        this.getSearchList({
          url: '/ajax/detail',
          data: {
            _sort: this.sort,
            _order: this.order,
            _page: currentPage,
            _limit: limit,
            detailTitle_like: this.value, // 关键字查询
            random: Date.now() // 不走缓存
          },
          callBack: () => {
            // 是否在加载状态
            this.loading = false
            // 下拉刷新成功关闭提示
            this.isLoading = false
            that.currentPage++

            // 如果返回的数据为空 修改提示
            if (this.SearchList.length === 0) {
              that.finishedText = '没有数据，请换个关键词'
              this.finished = true
            } else {
              that.finishedText = '没有更多了'
            }

            // 数据是否全部加载完成
            if (currentPage >= totalPage || this.SearchList.length < this.limit) {
              this.finished = true
            }

          }
        })

      },

      // 下拉刷新
      onRefresh () {
        // 重置vuex 数组 页码
        this.currentPage = 1
        this.finished = false
        this.count++
        this.onLoad()

      },

      searchTabHabdle () {
        let value = this.value
        if (!value) {
          Toast('关键字为空返回全部数据')
        }
        const newUrl = `/#` + this.$route.path + `?key=${value}`
        window.history.replaceState('', '', newUrl)
        this.currentPage = 1
        this.onLoad()

      },

      // 后退
      onClickLeft () {
        this.$router.back()
      }
    },

    beforeDestroy () {
      this.$store.state.SearchList = []
    }

  }
</script>

<style lang="scss" scoped>

  .nav-plaplace {
    height: 46px;
  }

  .SearchList {
    padding-bottom: 50px;
    box-sizing: border-box;
  }

  /*分类 排序*/
  .nav-cat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0 10px;
    box-sizing: border-box;

    .nav-cat-box {
      display: flex;
      align-items: center;
      font-size: 14px;

      span {
        margin-right: 2px;
      }

      i {
        transition: all .5s;
      }

      .desc {
        transform: rotate(-180deg);
      }

      &.active {
        color: #E9B354;
      }
    }
  }


</style>
