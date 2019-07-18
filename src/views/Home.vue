<template lang="pug">
  div#home
    Header(
      headerTitle="Sprinter"
    )
      div.header__left(
        slot="header__left"
        @click.stop="drawer = !drawer"
      )
        i.fas.fa-bars

    v-layout(
      data-app
      wrap
    )
      v-navigation-drawer.drawer(
        v-model="drawer"
        absolute
        temporary
      )
        div.drawer__close(
          @click.stop="drawer = !drawer"
        )
          button
            i.fas.fa-times
        DrawerList
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
      data-app
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

</template>

<script>
import firebase from 'firebase/app'
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import DrawerList from '@/components/DrawerList'
import { mapGetters } from 'vuex'
import { logout } from '@/mixins/logout'

export default {
  name: 'home',

  data: _ => ({
    dialog: false,
    drawer: false,
    isDarkmode: false,
  }),

  computed: {
    ...mapGetters([
      'getUser',
      'getStatus',
      'getDarkmode',
    ]),
  },

  methods: {
    logoutHandler () {
      this.dialog = false
      setTimeout(() => {
        this.logout()
      }, 250)
    },
  },

  mixins: [
    logout,
  ],

  components: {
    Header,
    AddTodo,
    TodoList,
    DrawerList,
  },

}
</script>

<style lang="scss" scoped>
#home {
  .wrapper {
    min-height: 100vh;
  }

  .layout {
    .v-overlay,
    .drawer {
      max-height: 100vh;
      position: fixed;
      overflow: hidden;

      @supports (padding-top: env(safe-area-inset-top)) {
        padding-top: calc(env(safe-area-inset-top));
        padding-bottom: calc(env(safe-area-inset-bottom));
      }
    }

    .drawer {
      .drawer__close {
        top: 0;
        left: 0;
        width: $header;
        height: $header;

        button {
          width: $header;
          height: $header;

          svg {
            color: $black54;
            @include font-size($grid5x);
          }
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
          margin: 0 auto;
          height: $grid12x;
          padding: $grid4x;
          color: $brand_red;
          display: inline-block;
          background-color: $black04;
          width: calc(100% - #{$grid8x});
          @include border-radius();

          svg {
            margin-left: $grid2x;
          }
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
}

.v-dialog {
  margin: 0 auto;
  padding: $grid2x 0;
  border-radius: $grid4x;
  background: transparent;
  max-width: 320px !important;
  width: calc(100% - #{$grid32x}) !important;

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
</style>
