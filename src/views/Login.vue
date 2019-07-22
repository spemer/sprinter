<template lang="pug">
  div#login.bg
    div.wrapper
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
              i.fab.fa-facebook-square
            div.login__btn-right
              span {{ $t('fbLogin') }}

        div.login__container-google
          button.login__btn(
            @click="googleLogin"
          )
            div.login__btn-left
              i.fab.fa-google
            div.login__btn-right
              span {{ $t('googleLogin') }}

        div.login__container-twitter
          button.login__btn(
            @click="twitterLogin"
          )
            div.login__btn-left
              i.fab.fa-twitter-square
            div.login__btn-right
              span {{ $t('twitterLogin') }}
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import { auth } from '@/firebase'
import { toast } from '@/mixins/toast'
import { globalVar } from '@/globalVar'

export default {
  name: 'login',

  metaInfo () {
    return {
      title: globalVar.appName,
      titleTemplate: `%s - ${this.$t('login')}`,
    }
  },

  methods: {
    fbLogin () {
      this.$Progress.start()
      const facebookProvider = new firebase.auth.FacebookAuthProvider()

      this.$store.dispatch('signInAction', facebookProvider)
      .then(() => {
        this.$Progress.finish()
        if (this.getUser) {
          this.$router.push('/')
          this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
        }
      })
    },

    googleLogin () {
      this.$Progress.start()
      const googleProvider = new firebase.auth.GoogleAuthProvider()

      this.$store.dispatch('signInAction', googleProvider)
      .then(() => {
        this.$Progress.finish()
        if (this.getUser) {
          this.$router.push('/')
          this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
        }
      })
    },

    twitterLogin () {
      this.$Progress.start()
      const twitterProvider = new firebase.auth.TwitterAuthProvider()

      this.$store.dispatch('signInAction', twitterProvider)
      .then(() => {
        this.$Progress.finish()
        if (this.getUser) {
          this.$router.push('/')
          this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
        }
      })
    },
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
  overflow: hidden;
  background-color: $brand !important;

  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: calc(env(safe-area-inset-top));
    padding-bottom: calc(env(safe-area-inset-bottom));
    height: calc(
      100vh + env(safe-area-inset-top) + env(safe-area-inset-bottom)
    );
  }

  .wrapper {
    background-color: $brand !important;

    .login__launcher {
      background-color: $brand !important;

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
      background-color: $brand !important;

      div {
        background-color: transparent !important;
      }

      @supports (padding-bottom: env(safe-area-inset-bottom)) {
        padding-bottom: calc(env(safe-area-inset-bottom));
      }

      .login__btn {
        width: 100%;
        cursor: pointer;
        height: $grid14x;
        font-weight: 700;
        margin-bottom: $grid2x;
        background-color: $brand_16 !important;
        @include border-radius();

        .login__btn-left {
          float: left;
          width: $grid12x;
          height: $grid14x;
          line-height: $grid14x;
          display: inline-block;

          svg {
            padding: 15px 0;
            color: $brand !important;
            @include font-size($grid6x);
          }
        }

        .login__btn-right {
          margin: 0 auto;
          height: $grid14x;
          margin-right: $grid6x;
          display: inline-block;
          width: calc(100% - #{$grid12x} - #{$grid12x});

          span {
            color: $brand !important;
            margin-right: $grid2x;
            display: inline-block;
            @include font-size($grid4x);
            line-height: $grid14x;
          }
        }
      }
    }
  }
}
</style>
