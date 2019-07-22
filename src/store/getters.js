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


  // appearance
  getDarkmode: (state) => {
    return state.darkmode
  },

  getLangs: (state) => {
    return state.langs
  },


  // bottom sheet
  getBottomSheet: (state) => {
    return state.bottomSheet
  },

}
