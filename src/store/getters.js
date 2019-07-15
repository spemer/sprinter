export const getters = {
  user: state => {
    return state.user
  },
  isLogged: state => {
    return state.user !== null
  },

}
