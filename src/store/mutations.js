import {
  SET_USER,
  SET_STATUS,
  SET_ERROR,
  SET_TODOS,
  SET_FILTER_SHOW,
  SET_DARKMODE,
  SET_BOTTOM_SHEET
} from '@/store/mutation-types'

export const mutations = {

  // user auth
  [SET_USER]: (state, payload) => {
    return state.user = payload
  },

  [SET_STATUS]: (state, payload) => {
    return state.status = payload
  },

  [SET_ERROR]: (state, payload) => {
    return state.error = payload
  },


  // todo list
  [SET_TODOS]: (state, payload) => {
    return state.todos = payload
  },

  [SET_FILTER_SHOW]: (state, i, bool) => {
    return state.colors[i][2] = !state.colors[i][2]
  },


  // darkmode
  [SET_DARKMODE]: (state, payload) => {
    return state.darkmode = payload
  },


  // bottom sheet
  [SET_BOTTOM_SHEET]: (state, bool) => {
    if (!bool) {
      setTimeout(() => {
        return state.bottomSheet = bool
      }, 250)
    } else {
      return state.bottomSheet = bool
    }
  },

}
