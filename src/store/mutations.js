import {
  SET_USER,
  SET_STATUS,
  SET_ERROR,
  SET_TODOS,
  SET_COLORED_TODOS_LENGTH,
  SET_FILTER_SHOW,
  SET_SELECTED_COLORS,
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

  [SET_COLORED_TODOS_LENGTH]: (state, [j, payload]) => {
    return state.colors[j][3] = payload
  },

  [SET_FILTER_SHOW]: (state, i) => {
    return state.colors[i][2] = !state.colors[i][2]
  },

  [SET_SELECTED_COLORS]: (state, [type, payload]) => {
    if (type == 'add') {
      return state.selectedColors.push(payload)
    } else if (type == 'remove') {
      return state.selectedColors.splice(state.selectedColors.indexOf(payload), 1)
    }
  },

  // bottom sheet
  [SET_BOTTOM_SHEET]: (state, bool) => {
    return state.bottomSheet = bool
  },

}
