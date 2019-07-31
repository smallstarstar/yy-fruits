
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
