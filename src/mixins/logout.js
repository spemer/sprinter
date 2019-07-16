import firebase from 'firebase/app'

export const logout = {
  methods: {
    logout: _ => {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/login')
        })
    },
  },
}
