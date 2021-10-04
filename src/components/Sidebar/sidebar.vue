<template>
  <div class="sidebar">
    <ul class="sidebar-list" ref="scrollY">
      <li :class="['sidebar-list-item',{active:activeKey === index}]"
          @click="sidebarClick(index)"
          v-for="(item, index) in senior" :key="item.id">
        <span class="sidebar-list-text">{{item.titlt}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex"
  export default {
    name: 'sidebar',
    props: {
      activeKey: {
        type: [String, Number]
      }
    },

    model:{
      prop: 'activeKey',
      event: 'sidebarClick'
    },

    computed:{
      ...mapState(["senior"])
    },
    mounted(){

      this.getsenior()

    },

    methods:{

      ...mapActions(["getsenior"]),

      sidebarClick(index){
        this.$emit("sidebarClick",index)
      }

    }

  }
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 100%;
    float: left;
    background-color: #f9f9f9;

    .sidebar-list {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

    }

    .sidebar-list-item {
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      color: #666;
      font-size: 14px;

      span{
        margin-left: 3px;
      }

      &.active {
        font-weight: 600;
        color: #222;
        background-color: white;

        &.sidebar-list-item::before{
          content: "";
          padding: 5px 2px;
          box-sizing: border-box;
          position: absolute;
          top: 15px;
          left: 5px;
          border-radius: 2px;
          background-color: #ff4422;

        }

      }
    }

  }
</style>
