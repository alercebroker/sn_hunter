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
  console.log("AYUDA");
  if (localStorage.getItem("access_token")) {
    console.log("access");
    next()
    store.dispatch("getCurrentUser").then(() => {
      console.log("IM in");
      console.log(store);
      console.log(store.getters.getUser);
      console.log(store.getters.getUser.username);
      if (store.getters.getUser.username) {
        console.log("Im if");
        next()
      }
      else {
        console.log("Im else");
        next("/404")
      }
    });
  }
  else {
    if (to.path === "/") next()
    else next("/")
  }
}
