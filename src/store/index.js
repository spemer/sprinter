import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import auth from '@/store/auth/auth'
import appearance from '@/store/appearance/appearance'
import todoList from '@/store/todoList/todoList'
import bottomSheet from '@/store/bottomSheet/bottomSheet'

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
    src: appearance,
  })],

  modules: {
    auth,
    appearance,
    todoList,
    bottomSheet,
  },
})

export default store
