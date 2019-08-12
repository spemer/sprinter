// import '@babel/polyfill'
import 'es6-promise/auto'
import 'promise-polyfill/src/polyfill'

import Vue from 'vue'
import './plugins/vuetify'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
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

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

import Vuetify from 'vuetify'
import VueMeta from 'vue-meta'
import Toasted from 'vue-toasted'
import VueScrollTo from 'vue-scrollto'
Vue.use(Vuetify)
Vue.use(VueMeta)
Vue.use(Toasted)
Vue.use(VueScrollTo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
