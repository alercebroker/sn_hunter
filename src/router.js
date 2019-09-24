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
      path: '/candidates',
      name: 'candidates',

      component: () => import('./views/Candidates.vue')
    },
    {
      path: '/classified',
      name: 'classified',
      component: () => import('./views/Classified.vue')
    },
  ]
})
