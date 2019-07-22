import {
  auth
} from '@/firebase'

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

}
