import {
  auth
} from '@/firebase'

export const actions = {
  signInAction({
    commit
  }, payload) {
    commit('SET_STATUS', 'loading')
    auth.signInWithPopup(payload)
      .then(response => {
        commit('SET_USER', response.user.uid)
        commit('SET_STATUS', 'success')
        commit('SET_ERROR', null)
      })
      .catch(error => {
        commit('SET_STATUS', 'failure')
        commit('SET_ERROR', error.message)
      })
  },

  signOutAction({
    commit
  }) {
    auth.signOut()
      .then(response => {
        commit('SET_USER', null)
        commit('SET_STATUS', 'success')
        commit('SET_ERROR', null)
      })
      .catch(error => {
        commit('SET_STATUS', 'failure')
        commit('SET_ERROR', error.message)
      })
  },
}
