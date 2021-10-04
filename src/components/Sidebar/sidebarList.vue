<template>
  <div class="sidebar-list">
    <div class="container">

      <keep-alive>
      <sidebar-list-item
        v-for="(item, index) in sort.content"
        :key="index"
        v-if="activeKey===index"
        :sort="item"
        :scrollX="sort.data"
      ></sidebar-list-item>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import SidebarListItem from './SidebarListItem'
  export default {
    name: 'sidebarList',
    components: { SidebarListItem },
    props:{
      activeKey:[String, Number]
    },
    model:{
      prop: "activeKey"
    },
    data(){
      return {
        show: false
      }
    },

    mounted () {
      this.getSort()
    },

    computed:{
      ...mapState(["sort"])
    },

    methods:{

      ...mapActions(["getSort"])


    },


  }
</script>

<style lang="scss" scoped>

  .sidebar-list{
    height: 100%;
    overflow: hidden;

    .container{
      height: 100%;
    }

  }

</style>
