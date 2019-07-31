import  Vue from 'vue';
import  Vuex from 'vuex';
import getters from './getters.js';
import userInfo from './modules/userInfo.js';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        commonurl: 'http://localhost:8888'
      },
      modules: {
        userInfo
      },
      getters
})