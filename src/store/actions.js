import {
  auth
} from '@/firebase'
import router from '@/router'

export const actions = {
  signInAction({
    commit
  }, payload) {
    commit('SET_STATUS', 'loading')
    return new Promise((resolve, reject) => {
      auth
        .signInWithPopup(payload)
        .then(response => {
          commit('SET_USER', response.user)
          commit('SET_STATUS', 'success')
          commit('SET_ERROR', null)
          router.replace('/')
          resolve()
        })
        .catch(error => {
          commit('SET_STATUS', 'failure')
          commit('SET_ERROR', error.message)
          console.error(error)
          reject()
        })
    })
  },

  signOutAction({
    commit
  }) {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(response => {
          commit('SET_USER', null)
          commit('SET_STATUS', 'success')
          commit('SET_ERROR', null)
          resolve()
        })
        .catch(error => {
          commit('SET_STATUS', 'failure')
          commit('SET_ERROR', error.message)
          console.error(error)
          reject()
        })
    })
  },

  setDarkmodeAction({
    commit
  }, payload) {
    return commit('SET_DARKMODE', payload)
  },

  setBottomsheetAction({
    commit
  }, bool) {
    if (bool === false) {
      setTimeout(() => {
        return commit('SET_BOTTOM_SHEET', false)
      }, 250)
    } else {
      return commit('SET_BOTTOM_SHEET', true)
    }
  },

}
