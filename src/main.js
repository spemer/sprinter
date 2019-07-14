import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'

import {
  firestorePlugin
} from 'vuefire'
Vue.use(firestorePlugin)

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'sprinter-web.firebaseapp.com',
  databaseURL: 'https://sprinter-web.firebaseio.com',
  projectId: 'sprinter-web',
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
}

firebase.initializeApp(config)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
