<template lang="pug">
  div#login
    div.login__container
      div.login__container-fb
        button(
          @click="fbLogin"
        ) Login with Facebook
      div.login__container-google
        button(
          @click="googleLogin"
        ) Login with Google
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',

  methods: {
    fbLogin () {
      const facebookProvider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        console.log(result)
        this.$router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
    },

    googleLogin () {
      const googleProvider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result)
        this.$router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
