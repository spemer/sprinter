export const getters = {

  // user auth
  getUser: (state) => {
    return state.user
  },

  getStatus: (state) => {
    return state.status
  },

  getError: (state) => {
    return state.error
  },


  // todo list
  getTodos: (state) => {
    return state.todos
  },

  getColors: (state) => {
    return state.colors
  },

  getSelectedColors: (state) => {
    return state.selectedColors
  },


  // appearance
  getDarkmode: (state) => {
    return state.darkmode
  },

  getLangs: (state) => {
    return state.langs
  },

  getCurrentLang: (state) => {
    return state.currentLang
  },


  // bottom sheet
  getBottomSheet: (state) => {
    return state.bottomSheet
  },

}
