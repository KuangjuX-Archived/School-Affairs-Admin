import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"

Vue.use(VueRouter)

  const routes = [
    {
      path: '',
      redirect: '/login'
    },

    {
      path: '/login',
      component: Login,
      name: 'Login',
    },

    {
      path: '/home',
      component: ()=>import("../views/Home"),
      name: 'Home'
    }
    ]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
