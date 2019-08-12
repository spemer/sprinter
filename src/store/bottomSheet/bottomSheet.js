import {
  SET_BOTTOM_SHEET
} from '@/store/mutation-types'

const state = {
  bottomSheet: false,
}

const mutations = {
  [SET_BOTTOM_SHEET]: (state, bool) => {
    return state.bottomSheet = bool
  },
}

const actions = {
  setBottomsheetAction({ commit }, bool) {
    if (bool === false) {
      setTimeout(() => {
        return commit('SET_BOTTOM_SHEET', false)
      }, 250)
    } else {
      setTimeout(() => {
        return commit('SET_BOTTOM_SHEET', true)
      }, 0)
    }
  },
}

const getters = {
  getBottomSheet: (state) => {
    return state.bottomSheet
  },
}

export default {
  state, mutations, actions, getters
}
