import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'

import VueTour from 'vue-tour'

Vue.config.productionTip = false

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
