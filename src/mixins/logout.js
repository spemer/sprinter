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
      // this.$modal.show('dialog', {
      //   title: 'Logout',
      //   text: 'Do you really want to log out?',
      //   buttons: [{
      //       title: 'Cancel',
      //     },
      //     {
      //       title: 'Logout',
      //       default: true,
      //       handler: _ => {
      //         this.$Progress.start()
      //         this.$store.dispatch('signOutAction')
      //           .then(() => {
      //             if (this.$store.getters.getUser === null) {
      //               this.$router.replace('/login')
      //               this.$Progress.finish()
      //             }
      //           })
      //       }
      //     },
      //   ]
      // })
    }
  },
}
