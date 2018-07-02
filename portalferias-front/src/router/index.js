// import { getToken, isTokenExpired } from 'common/utils/function-util'

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
// Router.beforeEach((to, from, next) => {
//   console.log('from', from)
//   console.log('to', to)
//   console.log('next', next)
//   const token = getToken()
//   if (token && !isTokenExpired(token)) {
//     return 'index_manager'
//   }
//   return 'login'
// })

export default Router
