import {
  SET_DARKMODE,
  SET_CURRENT_LANG
} from '@/store/mutation-types'

const state = {
  darkmode: false,
  langs: {
    'en': 'Language',
    'ko': '한국어',
    'en': 'English',
    'zh-CN': '中文',
  },
  currentLang: 'en',
}

const mutations = {
  [SET_DARKMODE]: (state, payload) => {
    return state.darkmode = payload
  },

  [SET_CURRENT_LANG]: (state, payload) => {
    return state.currentLang = payload
  },
}

const actions = {
  setDarkmodeAction({
    commit
  }, payload) {
    return commit('SET_DARKMODE', payload)
  },
}

const getters = {
  getDarkmode: (state) => {
    return state.darkmode
  },

  getLangs: (state) => {
    return state.langs
  },

  getCurrentLang: (state) => {
    return state.currentLang
  },
}

export default {
  state, mutations, actions, getters
}
