<template>
  <div class="search-box">
    <form class="search-submit">
      <input class="input" type="search" :value="value" placeholder="搜索你喜欢的商品" @input="changeinput">
      <a class="button" href="javascript:void (0);" @click="onSearchHandle">搜索</a>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'formSearch',
    props:{
      value:{
        type: [String, Number],
        default: ''
      }
    },
    data(){
      return {

      }
    },

    methods:{

      changeinput(e){
        this.$emit("input", e.target.value)
      },

      onSearchHandle(){
        this.$emit("search-tab")
      }

    },

  }
</script>


<style lang="scss" scoped>

  .search-box{
    height: 30px;
    padding: 10px 10px 10px;
    .search-submit{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .input{
        width: 100%;
        height: 30px;
        outline: none;
        border: 1px solid #006699;
        border-right: 0;
        font-size: 12px;
        padding-left: 15px;
        box-sizing: border-box;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .button{
        height: 30px;
        flex-shrink: 0;
        padding: 0 15px;
        line-height: 30px;
        box-sizing: border-box;
        color: white;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #006699;
      }
    }

  }

</style>
