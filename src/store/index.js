import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import { state } from '@/store/state.js'
import { getters } from '@/store/getters.js'
import { mutations } from '@/store/mutations.js'
import { actions } from '@/store/actions.js'

import appearance from '@/store/appearance/appearance'

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],

  modules: {
    appearance,
  },

  state,
  getters,
  mutations,
  actions,
})

export default store
