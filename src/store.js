import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },

  mutations: {
    SET_USER: (state, user) => {
      return state.user = user
    },
  },

  actions: {

  },

  getters: {
    user: state => {
      return state.user
    },
    isLogged: state => {
      return state.user !== null
    },
  }
})
