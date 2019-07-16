export const logout = {
  methods: {
    logout() {
      let askLogout = confirm('Do you really want to log out?')

      if (askLogout) {
        this.$store.dispatch('signOutAction')
          .then(() => {
            this.$router.replace('/login')
          })
      }
    }
  },
}
