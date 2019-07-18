import Vue from 'vue'
import './plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'

import '@/firebase'
import VueFire from 'vuefire'
import {
  firestorePlugin
} from 'vuefire'
Vue.use(firestorePlugin)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(255, 255, 255)',
  failedColor: 'rgb(255, 255, 255)',
  height: '4px',
})

import VModal from 'vue-js-modal'
Vue.use(VModal, {
  dialog: true,
})

import Toasted from 'vue-toasted'
Vue.use(Toasted)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
