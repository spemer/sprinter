export const getters = {
  currentUser: state => {
    return state.currentUser
  },
  isLogged: state => {
    return state.currentUser !== null
  },

}
