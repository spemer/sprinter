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
              font-awesome-icon.fab(
                :icon="['fab', 'facebook-square']"
              )
            div.login__btn-right
              span {{ $t('fbLogin') }}

        div.login__container-google
          button.login__btn(
            @click="googleLogin"
          )
            div.login__btn-left
              font-awesome-icon.fab(
                :icon="['fab', 'google']"
              )
            div.login__btn-right
              span {{ $t('googleLogin') }}

        div.login__container-twitter
          button.login__btn(
            @click="twitterLogin"
          )
            div.login__btn-left
              font-awesome-icon.fab(
                :icon="['fab', 'twitter-square']"
              )
            div.login__btn-right
              span {{ $t('twitterLogin') }}
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare"
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons/faTwitterSquare"
library.add(faFacebookSquare, faGoogle, faTwitterSquare)

import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import { globalVar } from '@/globalVar'
import { fbLogin, googleLogin, twitterLogin } from '@/mixins/login'

export default {
  name: 'login',

  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('login')}`,
      titleTemplate: `%s`,
    }
  },

  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },

  mixins: [
    fbLogin,
    googleLogin,
    twitterLogin,
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
  @include user-select();

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
