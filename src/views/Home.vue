<template lang="pug">
  div#home.bg
    Header(
      headerTitle="Sprinter"
    )
      div.header__left(
        slot="header__left"
        @click.stop="drawer = !drawer"
      )
        button
          font-awesome-icon.fas(
            :icon="['fas', 'bars']"
          )
      div.header__right(
        slot="header__right"
        @click="SET_BOTTOM_SHEET(true)"
      )
        button {{ $t('filter') }}

    BottomSheet.bottomsheet(
      v-if="getBottomSheet"
      :bottomSheetTitle="$t('filter')"
    )

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
            font-awesome-icon.fas(
              :icon="['fas', 'times']"
            )
        DrawerList
        div.drawer__logout(
          @click="dialog = true"
        )
          button.drawer__logout-btn {{ $t('logout') }}
            font-awesome-icon.fas(
              :icon="['fas', 'power-off']"
            )

    div.wrapper
      div.home__container
        TodoList

    AddTodo

    v-dialog(
      data-app
      v-model="dialog"
    )
      v-card
        v-card-title {{ $t('logout') }}
        v-card-text {{ $t('askLogout') }}
        v-card-actions
          button.cancel(
            flat
            @click="dialog = false"
          ) {{ $t('cancel') }}
          button.logout(
            flat
            @click="logoutHandler"
          ) {{ $t('logout') }}

</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff'
library.add(faBars, faTimes, faPowerOff)

import { mapGetters, mapMutations } from 'vuex'
import { logout } from '@/mixins/logout'
import { auth } from '@/firebase'
import { globalVar } from '@/globalVar'

export default {
  name: 'home',

  data: () => ({
    dialog: false,
    drawer: false,
    isDarkmode: false,
  }),

  metaInfo: () => ({
    title: `${globalVar.appName}`,
    titleTemplate: `%s`,
  }),

  mounted () {
    window.onpopstate = (event) => {
      if (auth.currentUser !== null && this.$route.path == '/login/') {
        this.$router.replace('/')
      }
    }
  },

  computed: {
    ...mapGetters([
      'getUser',
      'getStatus',
      'getDarkmode',
      'getBottomSheet',
    ]),
  },

  mixins: [
    logout,
  ],

  methods: {
    ...mapMutations([
      'SET_BOTTOM_SHEET',
    ]),

    logoutHandler () {
      this.dialog = false
      setTimeout(() => {
        this.logout()
      }, 250)
    },
  },

  components: {
    Header: () => import(/* webpackChunkName: 'components/Header' */ '@/components/Header'),
    AddTodo: () => import(/* webpackChunkName: 'components/AddTodo' */ '@/components/AddTodo'),
    TodoList: () => import(/* webpackChunkName: 'components/TodoList' */ '@/components/TodoList'),
    DrawerList: () => import(/* webpackChunkName: 'components/DrawerList' */ '@/components/DrawerList'),
    BottomSheet: () => import(/* webpackChunkName: 'components/BottomSheet' */ '@/components/BottomSheet'),
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
      position: fixed;
      overflow: hidden;
      max-height: 100vh;
    }

    .drawer {
      @include user-select();

      .drawer__close {
        top: 0;
        left: 0;
        width: $header;
        height: $header;

        @supports (padding-top: env(safe-area-inset-top)) {
          padding-top: calc(env(safe-area-inset-top));
        }

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
        z-index: 1;
        width: 100%;
        height: $grid12x;
        padding: $grid4x;
        position: absolute;

        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid4x});
        }

        .drawer__logout-btn {
          bottom: 0;
          margin: 0 auto;
          height: $grid12x;
          padding: $grid4x;
          color: $brand_red;
          display: inline-block;
          background-color: $black08;
          width: calc(100% - #{$grid8x});
          @include border-radius();
          @include font-size($grid4x);
          @include line-height(0px);

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
</style>
