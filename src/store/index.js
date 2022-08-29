import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' //保存token
  },
  getters: {
  },
  mutations: {
    updateToken(state, val) {
      state.token = val
    }
  },
  plugins: [createPersistedState()],
  // vuex默认保存在内存中，刷新会把所有值初始化（无法持久储存）
  // 用npm/yarn add vuex-persistedstate 这个包可以让vuex做持久化存储
  actions: {
  },
  modules: {
  }
})
