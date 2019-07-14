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
      const provider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)
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
