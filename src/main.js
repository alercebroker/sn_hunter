import Vue from 'vue'
import '@/plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import VueTour from 'vue-tour'

Vue.config.productionTip = false
import VueAuthenticate from 'vue-authenticate'


import VueAxios from 'vue-axios'
import axios from 'axios';
Vue.use(VueAxios, axios)

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)
Vue.use(VueAuthenticate, {
  tokenPath: 'token',
  providers: {
    google: {
      clientId: '913514262168-3lkcmu32uob1nfsql0dqgma76hpr9pbe.apps.googleusercontent.com',
      redirectUri: process.env.VUE_APP_REDIRECT,
      url: process.env.VUE_APP_USER_API+'/api/login/social/token_user/google/',
    }
  }
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
