import Vue from 'vue'
// import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import VueTour from 'vue-tour'

Vue.config.productionTip = false

import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/candlestick'
import 'echarts/lib/chart/custom'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import VueAuthenticate from 'vue-authenticate'


import VueAxios from 'vue-axios'
import axios from 'axios';
Vue.use(VueAxios, axios)


Vue.component('v-chart', ECharts)

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)

import VueResource from 'vue-resource'


// import GAuth from 'vue-google-oauth2'
// Vue.use(GAuth, {
//   clientId: '913514262168-3lkcmu32uob1nfsql0dqgma76hpr9pbe.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account',
// })

Vue.use(VueAuthenticate, {
  providers: {
    google: {
      clientId: '913514262168-3lkcmu32uob1nfsql0dqgma76hpr9pbe.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/',
      url: 'http://localhost:8000/api/login/social/token_user/google/',
    }
  }
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
