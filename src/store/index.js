import Vue from 'vue'
import Vuex from 'vuex'

import {
  reqRotation,
  reqCtNav,
  reqDetail,
  reqDetailItem,
  reqsenior,
  reqsort,
  reqSearchList,
  reqCartList,
} from '../api'
import {
  RECEPTION_ROTATION,
  RECEPTION_CTNAV,
  RECEPTION_DETAIL,
  RECEPTION_DETAILITEM,
  RECEPTION_SENIOR,
  RECEPTION_SORT,
  RECEPTION_SEARCHSTORAGE,
  RECEPTION_REMOVEHISTORY,
  RECEPTION_CLEARHISTORYITEM,
  RECEPTION_SEARCHLIST,
  RECEPTION_CARTLIST,
} from './mutations.type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 状态
    loadingShow: true,
    Rotation: [], //轮播
    ctnav: [], // 导航分类
    DetailList:[], // 首页列表
    DetailItem:{}, // 详情
    senior:[],
    sort: {},
    SearchStorage: JSON.parse(localStorage.getItem("SearchStorage")) || [],
    SearchList: [],
    CartList: [], // 购物列表
  },
  mutations: {
    //同步
    [RECEPTION_ROTATION] (state, Rotation) {
      state.Rotation = Rotation.data
    },
    [RECEPTION_CTNAV] (state, ctnav) {
      state.ctnav = ctnav.data
    },
    [RECEPTION_DETAIL] (state, Detail) {
      state.DetailList = Detail;

    },

    [RECEPTION_DETAILITEM] (state, DetailItem) {
      state.DetailItem = DetailItem
    },

    [RECEPTION_SENIOR] (state, senior) {
      state.senior = senior.data
    },

    [RECEPTION_SORT] (state, sort ) {
      state.sort = sort
    },

    [RECEPTION_SEARCHSTORAGE](state, list){
      //覆盖旧的历史
      localStorage.setItem('SearchStorage',JSON.stringify(list))
    },

    [RECEPTION_REMOVEHISTORY](state){
      state.SearchStorage = []
    },

    [RECEPTION_CLEARHISTORYITEM] (state, list) {
      localStorage.setItem('SearchStorage',JSON.stringify(list))
    },

    [RECEPTION_SEARCHLIST] (state,searchList) {
      state.SearchList.push(...searchList)
    },

    [RECEPTION_CARTLIST] (state,CartList) {
      state.CartList.push(...CartList)
    }


  },
  actions: {
    // 异步
    // 轮播
    async getRotation ({ commit }) {
      const Rotation = await reqRotation()
      commit(RECEPTION_ROTATION, Rotation)
    },
    // 首页轮播
    async getctnav ({commit}) {
      const  CtNav = await  reqCtNav()
      commit(RECEPTION_CTNAV,CtNav)
    },
    // 首页列表
    async getDetail ({commit, state}) {
      if (state.DetailList.length ===0){
        state.loadingShow = true;
        const  Detail = await  reqDetail()
        state.loadingShow = false;
        commit(RECEPTION_DETAIL,Detail)
      }

    },
    // 详情页
    async getDetailItem ({commit, state},params) {
      state.loadingShow = true;
      const  DetailItem = await  reqDetailItem(params)
      state.loadingShow = false;
      console.log(DetailItem)
      commit(RECEPTION_DETAILITEM,DetailItem)
    },

    async getsenior({commit,state},params){
      if(state.senior.length === 0){
        const senior = await reqsenior()
        commit(RECEPTION_SENIOR,senior)
      }
    },
    async getSort({commit,state}, fn){
      const sort = await reqsort()
      commit(RECEPTION_SORT,sort)
    },

    // 保存历史
    setSearchStorage ({commit,state}, key){
      let list = state.SearchStorage;
      list.unshift(key);
      if (list.length >= 4){
        list.splice(5)
      }
      commit(RECEPTION_SEARCHSTORAGE, list)
    },

    // 清空历史
    removeHistory ({commit, state}){
      localStorage.removeItem("SearchStorage");
      commit(RECEPTION_REMOVEHISTORY)
    },

    // 删除一个历史记录
    clearhistoryItem({commit, state},index){
      let list = state.SearchStorage;
      list.splice(index, 1);
      commit(RECEPTION_CLEARHISTORYITEM, list)
    },

    // 搜索列表
    async getSearchList({commit, state},params){
      let option = {
        url: params.url,
        data: params.data,
      }
      const searchList = await reqSearchList(option);
      if (params.data._page === 1){
        state.SearchList = []
      }
      commit(RECEPTION_SEARCHLIST, searchList)
      params.callBack && params.callBack()
    },

    /* 购物车列表*/
   async getCartList({commit, state}, params){
      let option = {
        url: params.url,
        data: params.data,
      }
      const CartList = await reqCartList(option);

     if (params.data._page === 1){
       state.CartList = []
     }
     commit(RECEPTION_CARTLIST, CartList)
     params.callBack && params.callBack()

    }


  },
  modules: {}
})
