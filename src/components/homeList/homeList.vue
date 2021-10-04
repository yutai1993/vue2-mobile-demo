<template>
  <div class="home-list">
    <home-list-item
    v-for="(item,index) in list" :key="index" :item="item"></home-list-item>
  </div>
</template>

<script>
  import HomeListItem from './homeListItem'
  export default {
    name: 'homeList',
    components: { HomeListItem },
    props:{
      list:{
        type:Array,
        default: ()=>{
          return []
        }
      }
    },
    data(){
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
.home-list{
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}
</style>
