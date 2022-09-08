const { defineConfig } = require('@vue/cli-service')
// 需要排除的对象
let externals = {}
// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'

if(isProduction){
     externals={
      echarts:'echarts',
      vue:'Vue',
      "vue-router":'VueRouter',
      vuex:'Vuex',
      axios:'axios',
      dayjs:'dayjs',
      'element-ui':'ELEMENT',
      'vue-quill-editor':'VueQuillEditor',
      'vuex-persistedatate':'createPersistedState'
    }
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 项目打包时需配置
  // publicPath:'./',
  publicPath:process.env.NODE_ENV === 'production'?'./':'/',
  // 排除第三方包
  configureWebpack:{
    externals:externals
  }
})
