import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"
import { getUser } from "../utils/cookie";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/home',
    component: () => import("../views/Home"),
    name: 'Home'
  },

  {
    path: '/message',
    component: () => import("../views/Message"),
    name: 'Message'
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})
router.beforeEach((to, from, next) => {
  //说明:
  //如果路由为/login，则跳转到login
  //如果路由为任意路由，则判断登录情况，如果存在token，跳转到home，否则跳转到login
  if (to.path === '/login') next();
  if (!getUser().token) {
    next({ path: '/login' })
  } else {
    if(to.path ==="/home"|| to.path === "/message"){
      next()
    }else {
      next({
        path: '/home'
      })
    }
  }
})
export default router
