import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import GAuth from 'vue-google-oauth2'

import VueTour from 'vue-tour'

Vue.config.productionTip = false

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)
Vue.use(GAuth, {
  clientId: '321796684930-h19g04r8q4aoh805btuba5d0gl64m7h4.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  hosted_domain: 'usach.cl'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
