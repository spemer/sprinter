import firebase from 'firebase'

export const logout = {
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/login')
        })
    },
  },
}
