import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import {Button} from 'mint-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import './common/stylus/fonts.styl'
import './mock/mockServer'
import './filters'
import loading from './common/img/loading.gif'

Vue.use(VueResource)
Vue.use(VueLazyload, {    // 内部会自定义一个全局指令 lazy来实现图片懒加载
  loading: loading
})
Vue.component(Button.name, Button); // 将组件映射成全局标签
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
