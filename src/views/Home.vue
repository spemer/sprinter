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
          i.fas.fa-bars
      div.header__right(
        slot="header__right"
        @click="toggleSheet(true)"
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
            i.fas.fa-times
        DrawerList
        div.drawer__logout(
          @click="dialog = true"
        )
          button.drawer__logout-btn {{ $t('logout') }}
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
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import DrawerList from '@/components/DrawerList'
import BottomSheet from '@/components/BottomSheet'
import { mapGetters, mapMutations } from 'vuex'
import { logout } from '@/mixins/logout'
import { auth } from '@/firebase'
import { globalVar } from '@/globalVar'

export default {
  name: 'home',

  data: _ => ({
    dialog: false,
    drawer: false,
    isDarkmode: false,
  }),

  metaInfo: _ => ({
    title: globalVar.appName,
    titleTemplate: `%s`,
  }),

  mounted () {
    window.onpopstate = event => {
      if (auth.currentUser !== null && this.$route.path == '/login') {
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

    toggleSheet(bool) {
      this.SET_BOTTOM_SHEET(bool)
    },
  },

  components: {
    Header,
    AddTodo,
    TodoList,
    DrawerList,
    BottomSheet,
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
        width: 100%;
        height: $grid12x;
        position: absolute;
        padding: $grid4x;

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

.v-dialog {
  margin: 0 auto;
  padding: $grid2x 0;
  border-radius: $grid4x;
  max-width: 320px !important;
  background-color: transparent;
  width: calc(100% - #{$grid32x}) !important;

  .v-card {
    @include border-radius(0);

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
      @include font-size($grid4x);
    }

    .v-card__actions {
      width: 100%;
      padding: 0 0 $grid2x 0;

      button {
        width: 50%;
        height: $grid12x;

        &.logout {
          font-weight: 700;
          color: $brand_red;
        }
      }
    }
  }
}

.theme--light {
  .v-dialog {
    .v-card__title,
    .v-card__text {
      color: $text333 !important;
    }

    .v-card__actions {
      button {
        &.cancel {
          color: $text777 !important;
        }
      }
    }
  }
}

.theme--dark {
  .v-dialog {
    .v-card__title,
    .v-card__text {
      color: $white87 !important;
    }

    .v-card__actions {
      button {
        &.cancel {
          color: $white54 !important;
        }
      }
    }
  }
}
</style>
