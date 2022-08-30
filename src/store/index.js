import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from "vuex-persistedstate";

import { getUserInfoAPI } from "@/api";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', //保存token
    userInfo:{} //保存用户信息（id,username,nickname,email,user_pic）
  },
  getters: {
    // username(state){
    //   return state.userInfo.username
    // }
    username : state => state.userInfo.username, //用户名
    nickname : state => state.userInfo.nickname, //用户昵称
    user_pic : state => state.userInfo.user_pic, //用户头像
  },
  mutations: {
    updateToken(state, val) {
      state.token = val
    },
    updateuserInfo(state,val){
      state.userInfo = val
    }
  },
  plugins: [createPersistedState()],
  // vuex默认保存在内存中，刷新会把所有值初始化（无法持久储存）
  // 用npm/yarn add vuex-persistedstate 这个包可以让vuex做持久化存储
  actions: {
   async getUserInfoActions(store){
     const res = await getUserInfoAPI()
     console.log(res);
     store.commit('updateuserInfo',res.data.data)
    }
  },
  modules: {
  }
})
