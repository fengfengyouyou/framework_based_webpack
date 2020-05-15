
// 然后打开 store.js 文件，导入这两个 module ：
import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA';
import moduleB from './modules/moduleB';
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    moduleA, moduleB,
  },
  // ...
})
