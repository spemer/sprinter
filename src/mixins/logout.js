export const logout = {
  methods: {
    logout() {
      this.$Progress.start()
      this.$store.dispatch('signOutAction')
        .then(() => {
          if (this.$store.getters.getUser === null) {
            this.$router.replace('/login')
            this.$Progress.finish()
          }
        })
    }
  },
}
