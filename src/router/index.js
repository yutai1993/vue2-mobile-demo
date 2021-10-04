import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "Cart.vue" */ '../views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
  },
  {
    path: '/searchlist',
    name: 'SearchList',
    component: () => import(/* webpackChunkName: "SearchList" */ '../views/SearchList.vue'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
