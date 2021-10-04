import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*fastclick*/
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})




import { NavBar } from 'vant';

Vue.use(NavBar);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
