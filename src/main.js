import Vue from 'vue'
import '@/plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import VueTour from 'vue-tour'

Vue.config.productionTip = false


import VueAxios from 'vue-axios'
import axios from 'axios';
Vue.use(VueAxios, axios)

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
