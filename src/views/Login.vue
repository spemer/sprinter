<template lang="pug">
  div#login.bg
    div.wrapper
      div.login_launcher
        img.login_launcher-img(
          alt="appName"
          src="../assets/launcher.svg"
        )
      div.login_container
        div.login_container-fb
          button.login_btn(
            @click="fbLogin"
            rel="noopener noreferrer"
          )
            div.login_btn-left
              font-awesome-icon.fab(
                :icon="['fab', 'facebook-square']"
              )
            div.login_btn-right
              span {{ $t('fbLogin') }}

        div.login_container-google
          button.login_btn(
            @click="googleLogin"
            rel="noopener noreferrer"
          )
            div.login_btn-left
              font-awesome-icon.fab(
                :icon="['fab', 'google']"
              )
            div.login_btn-right
              span {{ $t('googleLogin') }}

        div.login_container-twitter
          button.login_btn(
            @click="twitterLogin"
            rel="noopener noreferrer"
          )
            div.login_btn-left
              font-awesome-icon.fab(
                :icon="['fab', 'twitter-square']"
              )
            div.login_btn-right
              span {{ $t('twitterLogin') }}

        div.login_container-policy
          router-link(
            to="/privacy-policy/"
          ) {{ $t('loginPolicy') }}
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare'
library.add(faFacebookSquare, faGoogle, faTwitterSquare)

import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import { globalVar } from '@/globalVar'
import { fbLogin, googleLogin, twitterLogin } from '@/mixins/login'

export default {
  name: 'login',

  data: () => ({
    appName: globalVar.appName,
  }),

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

    .login_launcher {
      background-color: $brand !important;

      .login_launcher-img {
        margin: 0 auto;
        display: block;
        width: $grid32x;
        padding-top: $grid24x;
      }
    }

    .login_container {
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

      .login_btn {
        width: 100%;
        cursor: pointer;
        height: $grid14x;
        font-weight: 700;
        margin-bottom: $grid2x;
        background-color: $brand_16 !important;
        @include border-radius();

        .login_btn-left {
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

        .login_btn-right {
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

      .login_container-policy {
        margin: $grid4x 0 0;

        a {
          @include font-size($grid4x);
        }
      }
    }
  }
}

.lightmode, .darkmode {
  .login_container-policy {
    a {
      color: #fff !important;
    }
  }
}
</style>
