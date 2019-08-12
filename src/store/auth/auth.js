import {
  SET_USER,
  SET_STATUS,
  SET_ERROR
} from '@/store/mutation-types'

import { auth } from '@/firebase'
import router from '@/router'

const state = {
  user: null,
  status: null,
  error: null,
}

const mutations = {
  [SET_USER]: (state, payload) => {
    return state.user = payload
  },

  [SET_STATUS]: (state, payload) => {
    return state.status = payload
  },

  [SET_ERROR]: (state, payload) => {
    return state.error = payload
  },
}

const actions = {
  signInAction({ commit }, payload) {
    commit('SET_STATUS', 'loading')
    return new Promise((resolve, reject) => {
      auth
        .signInWithPopup(payload)
        .then((response) => {
          commit('SET_USER', response.user)
          commit('SET_STATUS', 'success')
          commit('SET_ERROR', null)
          router.replace('/')
          resolve()
        })
        .catch((error) => {
          commit('SET_STATUS', 'failure')
          commit('SET_ERROR', error.message)
          console.error(error)
          reject()
        })
    })
  },

  signOutAction({ commit }) {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then((response) => {
          commit('SET_USER', null)
          commit('SET_STATUS', 'success')
          commit('SET_ERROR', null)
          resolve()
        })
        .catch((error) => {
          commit('SET_STATUS', 'failure')
          commit('SET_ERROR', error.message)
          console.error(error)
          reject()
        })
    })
  },
}

const getters = {
  getUser: (state) => {
    return state.user
  },

  getStatus: (state) => {
    return state.status
  },

  getError: (state) => {
    return state.error
  },
}

export default {
  state, mutations, actions, getters
}
