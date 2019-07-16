import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'

import {
  firestorePlugin
} from 'vuefire'
Vue.use(firestorePlugin)

import '@/firebase'
import VueFire from 'vuefire'

import Toasted from 'vue-toasted'
import DrawerLayout from 'vue-drawer-layout'
Vue.use(Toasted)
Vue.use(DrawerLayout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
