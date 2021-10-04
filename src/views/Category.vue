<template>
  <div class="category">
    <!--导航-->
    <van-nav-bar
      fixed
      title="分类"
      left-arrow
      safe-area-inset-top
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >

      <template #right>
        <van-icon name="search" size="20" color="#fff"/>
      </template>

    </van-nav-bar>

    <!--侧边栏-->
    <sidebar v-model="activeKey"></sidebar>

    <sidebar-list v-model="activeKey"></sidebar-list>

  </div>
</template>

<script>

  import Sidebar from '../components/Sidebar/sidebar'
  import SidebarList from '../components/Sidebar/sidebarList'
  export default {
    name: 'Category',
    components: { SidebarList, Sidebar },
    data () {
      return {
        activeKey: 0,

      }
    },

    computed: {



    },

    mounted(){


    },

    methods: {

      onClickLeft(){
        this.$router.back()
      },

      onClickRight(){
        this.$router.push('/search')
      }

    }

  }
</script>

<style lang="scss">

  .category{
    height: 100%;
    padding: 46px 0 50px;
    box-sizing: border-box;

  }


</style>
