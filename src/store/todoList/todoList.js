import {
  SET_TODOS,
  SET_COLORED_TODOS_LENGTH,
  SET_FILTER_SHOW,
  SET_SELECTED_COLORS
} from '@/store/mutation-types'

import { globalVar } from '@/globalVar'

const state = {
  todos: [],
  colors: [
    [globalVar.todoColors[0], 'transparent', 'true'],
    [globalVar.todoColors[1], 'transparent', 'true'],
    [globalVar.todoColors[2], 'transparent', 'true'],
    [globalVar.todoColors[3], 'transparent', 'true'],
    [globalVar.todoColors[4], 'transparent', 'true'],
    [globalVar.todoColors[5], 'transparent', 'true'],
    [globalVar.todoColors[6], 'transparent', 'true'],
  ],
  selectedColors: [
    globalVar.todoColors[0],
    globalVar.todoColors[1],
    globalVar.todoColors[2],
    globalVar.todoColors[3],
    globalVar.todoColors[4],
    globalVar.todoColors[5],
    globalVar.todoColors[6],
  ],
}

const mutations = {
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
    if (type === 'add') {
      return state.selectedColors.push(payload)
    } else if (type === 'remove') {
      return state.selectedColors.splice(state.selectedColors.indexOf(payload), 1)
    }
  },
}

const actions = {

}

const getters = {
  getTodos: (state) => {
    return state.todos
  },

  getColors: (state) => {
    return state.colors
  },

  getSelectedColors: (state) => {
    return state.selectedColors
  },
}

export default {
  state, mutations, actions, getters
}
