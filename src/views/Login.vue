<template lang="pug">
  div#login
    div.container
      div.login__launcher
        img.login__launcher-img(
          src="../assets/launcher.svg"
        )
      div.login__container
        div.login__container-fb
          button.login__btn(
            @click="fbLogin"
          )
            div.login__btn-left
              i.fab.fa-facebook-f
            div.login__btn-right
              span Continue with Facebook
        div.login__container-google
          button.login__btn(
            @click="googleLogin"
          )
            div.login__btn-left
              i.fab.fa-google
            div.login__btn-right
              span Continue with Google
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import { auth } from '@/firebase'
import { toast } from '@/mixins/toast'

export default {
  name: 'login',

  methods: {
    fbLogin () {
      const facebookProvider = new firebase.auth.FacebookAuthProvider()

      this.$store.dispatch('signInAction', facebookProvider)
      .then(() => {
        if (this.getUser) {
          this.$router.push('/')
        }
      })
    },

    googleLogin () {
      const googleProvider = new firebase.auth.GoogleAuthProvider()

      this.$store.dispatch('signInAction', googleProvider)
      .then(() => {
        if (this.getUser) {
          this.$router.push('/')
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },

  mixins: [
    toast,
  ],
}
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: $brand;

  // iPhone X safearea
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom));
  }

  .login__launcher {
    .login__launcher-img {
      margin: 0 auto;
      display: block;
      width: $grid32x;
      padding-top: $grid24x;
    }
  }

  .login__container {
    bottom: 0;
    position: fixed;
    margin-bottom: $grid8x;
    width: calc(100% - #{$grid8x});

    .login__btn {
      width: 100%;
      color: $brand;
      cursor: pointer;
      height: $grid14x;
      font-weight: 700;
      margin-bottom: $grid2x;
      background-color: $brand_16;
      @include border-radius();

      .login__btn-left {
        float: left;
        width: $grid12x;
        height: $grid14x;
        line-height: $grid14x;
        display: inline-block;

        i {
          width: $grid8x;
          @include font-size($grid5x);
        }
      }

      .login__btn-right {
        margin: 0 auto;
        height: $grid14x;
        margin-right: $grid6x;
        display: inline-block;
        width: calc(100% - #{$grid12x} - #{$grid12x});

        span {
          margin-right: $grid2x;
          display: inline-block;
          @include font-size($grid4x);
          line-height: $grid14x;
        }
      }
    }
  }
}
</style>
