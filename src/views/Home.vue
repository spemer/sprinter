<template lang="pug">
  div#home
    Header(
      headerTitle="TODO"
    )
      div.header__left(
        slot="header__left"
        @click.stop="drawer = !drawer"
      )
        i.fas.fa-bars

    v-navigation-drawer.drawer(
      v-model="drawer"
      absolute
      temporary
    )
      div.drawer__userInfo
        img.drawer__userInfo-img(
          :src="userInfo.photoUrl"
        )
        p.drawer__userInfo-displayName {{ userInfo.displayName }}
          i.fab(
            :class="getProvider(userInfo.provider)"
          )
        p.drawer__userInfo-email {{ userInfo.email }}
      div.drawer__logout(
        @click="dialog = true"
      )
        button.drawer__logout-btn Logout
          i.fas.fa-power-off

    div.wrapper
      div.home__container
        TodoList

    AddTodo

    v-dialog(
      v-model="dialog"
    )
      v-card
        v-card-title Logout
        v-card-text Do you really want to log out?
        v-card-actions
          button.cancel(
            flat
            @click="dialog = false"
          ) Cancel
          button.logout(
            flat
            @click="logoutHandler"
          ) Logout

    //- v-dialog.modal(:width="320")
</template>

<script>
import firebase from 'firebase/app'
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import { mapGetters } from 'vuex'
import { logout } from '@/mixins/logout'
import { auth } from '@/firebase'

export default {
  name: 'home',

  data: _ => ({
    dialog: false,
    drawer: false,
    userInfo: {
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: `${auth.currentUser.photoURL}/picture?height=500`,
      provider: auth.currentUser.providerData[0].providerId,
    },
  }),

  computed: {
    ...mapGetters([
      'getUser',
      'getStatus',
    ]),
  },

  methods: {
    logoutHandler () {
      this.dialog = false
      setTimeout(() => {
        this.logout()
      }, 250)
    },

    getProvider (provider) {
      if (provider === 'facebook.com') {
        return 'fa-facebook-square'
      }
      else if (provider === 'google.com') {
        return 'fa-google'
      }
      else if (provider === 'twitter.com') {
        return 'fa-twitter-square'
      }
    },
  },

  mounted () {
    console.log(this.userInfo)
  },

  mixins: [
    logout,
  ],

  components: {
    Header,
    AddTodo,
    TodoList,
  },

}
</script>

<style lang="scss" scoped>
#home {
  .drawer {
    @supports (padding-top: env(safe-area-inset-top)) {
      padding-top: calc(env(safe-area-inset-top));
      padding-bottom: calc(env(safe-area-inset-bottom));
    }

    .drawer__userInfo {
      padding: $grid4x;
      border-bottom: 1px solid #ccc;

      .drawer__userInfo-img {
        width: $grid16x;
        height: $grid16x;
        display: inline-block;
        margin-bottom: $grid4x;
        @include border-radius($grid16x);
      }

      .drawer__userInfo-displayName,
      .drawer__userInfo-email {
        margin: 0 auto;
      }

      .drawer__userInfo-displayName {
        font-weight: 700;
        @include font-size($grid5x);

        svg {
          margin-left: $grid2x;

          &.fa-facebook-square {
            color: $facebook;
          }

          &.fa-google {
            color: $google;
          }

          &.fa-twitter-square {
            color: $twitter;
          }
        }
      }

      .drawer__userInfo-email {
        font-weight: 400;
        color: $black54;
      }
    }

    .drawer__logout {
      bottom: 0;
      width: 100%;
      height: $grid12x;
      position: absolute;
      padding: $grid4x;

      .drawer__logout-btn {
        bottom: 0;
        padding: $grid4x;
        width: calc(100% - #{$grid8x});
        height: $grid12x;
        margin: 0 auto;
        display: inline-block;
        background-color: $black04;
        color: $brand_red;
        @include border-radius();

        svg {
          margin-left: $grid2x;
        }
      }
    }
  }

  .home__container {
    padding-top: $grid16x;

    @supports (padding-top: env(safe-area-inset-top)) {
      padding-top: calc(env(safe-area-inset-top) + #{$grid16x}) !important;
    }
  }

  .v-dialog {
    margin: 0 auto;
    padding: $grid2x 0;
    border-radius: $grid4x;
    background: transparent;
    width: calc(100% - #{$grid16x});

    .v-card {
      background: #fff;
      @include border-radius();
      @include drop-shadow($grid4x, $grid8x, $black16);

      .v-card__title,
      .v-card__text {
        margin: 0 auto;
        text-align: center;
        display: inline-block;
        width: calc(100% - #{$grid8x});
      }

      .v-card__title {
        font-weight: 700;
        padding-bottom: 0;
        @include font-size($grid5x);
      }

      .v-card__text {
        padding-top: 0;
        color: $black54;
        @include font-size($grid4x);
      }

      .v-card__actions {
        padding: 0;
        width: 100%;

        button {
          width: 50%;
          height: $grid12x;

          &.cancel {
            color: $black54;
          }

          &.logout {
            font-weight: 700;
            color: $brand_red;
          }
        }
      }
    }
  }
}
</style>
