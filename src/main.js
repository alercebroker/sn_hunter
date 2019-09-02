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
  clientId: '913514262168-3lkcmu32uob1nfsql0dqgma76hpr9pbe.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
