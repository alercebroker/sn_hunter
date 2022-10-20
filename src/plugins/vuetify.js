import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})
