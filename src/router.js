import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: requireAuth,
      component: () => import('./views/Home.vue')
    },
    {
      path: '/faq',
      name: 'faq',

      component: () => import('./views/Faq.vue')
    },
    {
      path: "/oauth",
      name: "oauth",
      component: () => import('./views/GoogleOAuth2.vue'),
      exact: true,
      meta: {
        title: "OAuth",
      },
    }
  ]
})

function requireAuth(to, from, next) {
  if (localStorage.getItem("access_token")) {
    store.dispatch("getCurrentUser").then(() => {
      if (store.getters.getUser.username) {
        next()
      }
      else {
        next("/404")
      }
    });
  }
  else {
    if (to.path === "/") next()
    else next("/")
  }
}
