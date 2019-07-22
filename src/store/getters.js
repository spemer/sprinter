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
  getColors: (state) => {
    return state.colors
  },

  getBottomSheet: (state) => {
    return state.bottomSheet
  },


  // appearance
  getDarkmode: (state) => {
    return state.darkmode
  },

  getLangs: (state) => {
    return state.langs
  },

}
