<template>
  <div class="sidebar-content-box">
    <!--标准-->
    <template v-if="sort.model === 'Basics'">
      <div class="Sidebar-list-item standard">
        <div class="container">
          <div class="standard-item" v-for="item in sort.classContent" :key="item.id">
            <div class="container-header">
              <h3>{{item.title}}</h3>
            </div>
            <div class="body">
              <div class="body-item" v-for="list in item.data" :key="list.id">
                <div class="item-img-box">
                  <img src="http://image1.suning.cn/uimg/asbs/ad/1603098078321_imgWap_tmndir.jpg" alt="">
                </div>
                <p>{{list.text}}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </template>


    <!--大图-->
    <template v-if="sort.model === 'img'">
      <div class="img">
        <img src="http://image4.suning.cn/uimg/asbs/ad/1608627028102_app_wap_list.jpg" alt="">
      </div>

      <div class="Sidebar-list-item">
        <div class="container">
          <div class="standard-item" v-for="item in sort.classContent" :key="item.id">
            <div class="container-header">
              <h3>{{item.title}}</h3>
            </div>
            <div class="body">
              <div class="body-item" v-for="list in item.data" :key="list.id">
                <div class="item-img-box">
                  <img src="http://image1.suning.cn/uimg/asbs/ad/1603098078321_imgWap_tmndir.jpg" alt="">
                </div>
                <p>{{list.text}}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </template>


    <!--横向滚动-->
    <template v-if="sort.model === 'scrollX'">
      <div class="scrollX" ref="scrollX">
        <div class="scrollX-content">
          <span :class="['scrollX-item',{active:index === currentIndex}]" v-for="(item, index) in scrollX"
                :key="item.id">{{item.title}}</span>
        </div>
      </div>

      <div class="Sidebar-list-item" ref="scrollY">
        <div class="container">
          <div class="standard-item" v-for="item in sort.classContent" :key="item.id">
            <div class="container-header">
              <h3>{{item.title}}</h3>
            </div>
            <div class="body">
              <div class="body-item" v-for="list in item.data" :key="list.id">
                <div class="item-img-box">
                  <img src="http://image1.suning.cn/uimg/asbs/ad/1603098078321_imgWap_tmndir.jpg" alt="">
                </div>
                <p>{{list.text}}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </template>


  </div>

</template>

<script>
  export default {
    name: 'SidebarListItem',
    props: {
      sort: {
        type: Object
      },
      scrollX: {
        type: Array
      }
    },
    data () {
      return {
        scrollTop: [],
        scrollY: 0, // 滚动的距离
        currentIndex: 0,
        scrollXHeight: 0,
      }
    },

    watch: {
      // 返回 盾冬到目标的索引
      scrollY (newVnode) {
        let { scrollTop } = this
        let index = scrollTop.findIndex((item, index) => {
          return newVnode >= item && newVnode < scrollTop[index + 1]
        })
        this.currentIndex = index
      },

      currentIndex (newVnode) {
        if (newVnode > 3) {
          this.$refs.scrollX.scrollBy(50, 0)
          return
        }
        if (newVnode < 7) {
          this.$refs.scrollX.scrollBy(-50, 0)

        }
      }

    },

    mounted () {

      if (this.sort.model === 'scrollX') {
        // 获取 位置信息
        this.initScrollTop()

        //注册滚动事件
        this.$refs.scrollY.addEventListener('scroll', this.getScroll)

      }

    },

    methods: {

      // 获取位置信息
      initScrollTop () {
        let tops = []
        let top = 0
        let elObj = this.$refs.scrollY.getElementsByClassName('standard-item')
        Array.prototype.slice.call(elObj).forEach((item, index) => {
          top += item.clientHeight
          tops.push(top)
        })
        this.scrollTop = tops
        this.scrollTop.unshift(0)
      },

      // 滚动事件 回调
      getScroll (e) {
        this.scrollY = e.target.scrollTop
      },

    },

    beforeDestroy () {

      if (this.sort.model === 'scrollX') {
        this.$refs.scrollY.removeEventListener('scroll', this.getScroll)
      }
    }

  }
</script>

<style lang="scss" scoped>

  .sidebar-content-box {
    height: 100%;
    display: flex;
    flex-direction: column;

    /* 大图 */
    .img {
      height: 100px;
      margin: 10px 10px 0;
      border-radius: 20px;
      background-color: #ff4422;
      overflow: hidden;

      img {
        width: 100%;
        display: block;
      }
    }

    /* 横向滚动 */
    .scrollX {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;

      .scrollX-content {
        white-space: nowrap;
        display: inline-block;
        padding: 0 10px;
        box-sizing: border-box;

        .scrollX-item {
          display: inline-block;
          padding: 5px 5px 8px;
          box-sizing: border-box;
          font-size: 14px;
          position: relative;
          margin-bottom: 2px;

          &.active {
            font-weight: 600;

            &.active::after {
              content: "";
              padding: 2px 5px;
              border-radius: 10px;
              position: absolute;
              bottom: 0;
              left: 50%;
              margin-left: -5px;
              background-color: #ff4422;
            }

          }

        }
      }
    }

    .Sidebar-list-item {
      flex: 1;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;

      .container {
        padding: 0 10px 20px;
        box-sizing: border-box;

        .container-header {
          h3 {
            font-size: 12px;
            font-weight: 600;
            margin: 0;
          }
        }

        .standard-item {
          padding-top: 15px;
          box-sizing: border-box;
        }

        .body {
          display: flex;
          flex-wrap: wrap;

          .body-item {
            width: 22%;
            margin: 10px 17% 0 0;

            .item-img-box {

              img {
                width: 100%;
                display: block;
              }
            }

            p {
              margin: 0;
              text-align: center;
              font-size: 12px;
            }
          }

          .body-item:nth-child(3n) {
            margin-right: 0;
          }
        }
      }


      /*.container{*/
      /*  height: 100%;*/
      /*  overflow-x: hidden;*/
      /*  overflow-y: auto;*/
      /*}*/
    }

  }


</style>
