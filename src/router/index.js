import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '@/store'
// import HomeView from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', //网页打开第一次默认路径
    component: () => import('@/views/layout'),
    redirect:'/home', //会导致路由规则再次匹配
    children:[
      {
        // 侧边栏导航
        path:'home',
        component:() => import('@/views/home')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

  // 无需登录白名单
  let whileList = ['/login','/reg']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  }else{

    if(whileList.includes(to.path)){
      // 未登录，可以访问的路由地址，放行
      next()
    }else{
      // 强制切换到登录页
      next('/login')
    }
  }
})

export default router
