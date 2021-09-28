import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
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
