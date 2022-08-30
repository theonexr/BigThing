<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import { registerAPI } from '@/api';
export default {
  // async created(){
  //   const res = await registerAPI()
  //   console.log(res);
  // }
  created(){
    // 调取vuex中用户信息
    // this.$store.dispatch('getUserInfoActions')
  }
}
</script>
<style lang="less">
#app{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
