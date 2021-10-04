<template>
  <div class="Search">
    <!--导航-->
    <van-nav-bar
      title="搜索中心"
      left-arrow
      safe-area-inset-top
      @click-left="onClickLeft"

    />

    <form-search @search-tab="searchTabHabdle" v-model="value"></form-search>

    <div class="Storage">
      <div class="Storage-box">
        <span class="left">搜索历史</span>
        <div class="Storage-right" @click="clearhistory">
          <i class="iconfont icon-huishou"></i>
          <span>清空历史</span>
        </div>
      </div>

      <div class="Storage-list-box border">
        <div class="Storage-list border-bottom" v-for="(item, index) in SearchStorage" :key="index">
          <span class="van-ellipsis" @click="keyClick($event)">{{item}}</span>
          <van-icon name="close" @click="clearhistoryItem(index)" />
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import FormSearch from '../components/Search/formSearch'
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import { Icon, Toast } from 'vant'

  Vue.use(Icon)
  Vue.use(Toast)
  export default {
    name: 'Search',
    components: { FormSearch },
    data () {
      return {
        value: "",
      }
    },

    mounted () {

    },

    computed:{
      ...mapState(["SearchStorage"])
    },

    methods: {

      // 删除一个历史记录
      clearhistoryItem(index){
        this.$store.dispatch("clearhistoryItem", index)
      },


      // 清空历史
      clearhistory(){
        this.$store.dispatch("removeHistory")
      },

      keyClick(event){
        let key = event.target.innerText;
        this.$router.push({path:"/searchList",query:{key}})

      },

      // 关键字宝存历史 并路由跳转
      searchTabHabdle () {
        let data = this.value
        if (!data){
          Toast('关键字为空');
          return;
        }

        // 搜索关键字存入本地
        this.$store.dispatch("setSearchStorage", data);

        this.$router.push({path:"/searchList",query:{key:data}})
      },

      /*后退*/
      onClickLeft () {
        this.$router.back()
      }

    },

  }
</script>

<style lang="scss">

  .Storage{
    padding: 0 10px;
    box-sizing: border-box;

    .Storage-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      .Storage-right{
        display: flex;
          align-items: center;
        i{
          height: 16px;
        }
      }
    }

    .Storage-list-box{
      margin-top: 15px;
      border-bottom: 0;
      border-color: #ddd;

      .Storage-list{
        display: flex;
        align-items: center;
        padding: 5px 15px;
        font-size: 14px;
        box-sizing: border-box;
        justify-content: space-between;

        span{
          max-width: 200px;
          width: 100%;
        }

      }

    }
  }
</style>
