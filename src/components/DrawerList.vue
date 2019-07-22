<template lang="pug">
  div#drawerlist.drawer.bg
    div.drawer__userInfo
      img.drawer__userInfo-img(
        :src="setPhotoUrl(userInfo.provider)"
      )
      p.drawer__userInfo-displayName {{ userInfo.displayName }}
        i.fab(
          :class="getProvider(userInfo.provider)"
        )
      p.drawer__userInfo-email {{ userInfo.email }}
    div.drawer__list
      div.drawer__list-each
        div.drawer__list-darkmode
          div.drawer__list-switch(
            @click="toggleDarkmode"
          )
            span.drawer__list-switch-text {{ $t('darkmode') }}
            input(
              type="checkbox"
              :checked="getDarkmode"
            )
            span.checkmark
      div.drawer__list-each
        div.drawer__list-locale
          i.fas.fa-globe
          select(
            v-model="$i18n.locale"
          )
            option(
              v-for="(lang, index, key) in getLangs"
              :key="key"
              :value="index"
            ) {{ lang }}
      div.drawer__list-each
        div.drawer__list-ops(
          @click="opensource"
        )
          i.fas.fa-code
          span {{ $t('ops') }}
      div.drawer__list-each
        div.drawer__list-ops(
          @click="shareApi"
        )
          i.fas.fa-share-square
          span {{ $t('share') }}
</template>

<script>
import firebase from 'firebase/app'
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import DrawerList from '@/components/DrawerList'
import { mapGetters, mapMutations } from 'vuex'
import { logout } from '@/mixins/logout'
import { toast } from '@/mixins/toast'
import { auth } from '@/firebase'
import { globalVar } from '@/globalVar'

export default {
  name: 'home',

  data: _ => ({
    dialog: false,
    userInfo: {
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      provider: auth.currentUser.providerData[0].providerId,
    },
  }),

  computed: {
    ...mapGetters([
      'getDarkmode',
      'getLangs',
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_DARKMODE',
    ]),

    shareApi () {
      if (navigator.share) {
        navigator.share({
          title: globalVar.appName,
          text: globalVar.appDescription,
          url: 'https://sprinter-web.web.app',
        })
      }
    },

    opensource () {
      this.$router.push('/opensource')
    },

    toggleDarkmode () {
      this.SET_DARKMODE(!this.getDarkmode)
      console.log(`Darkmode: ${this.getDarkmode}`)
    },

    setPhotoUrl (provider) {
      return (provider === 'facebook.com')
        ? `${auth.currentUser.photoURL}/picture?height=500`
        : auth.currentUser.photoURL
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
.drawer {
  width: 100%;

  ::selection {
    background-color: transparent !important;
  }

  .drawer__userInfo {
    padding: $grid4x;
    border-bottom: 1px solid $texteee;

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

  .drawer__list {
    $list: $grid8x;

    padding: $grid2x $grid4x $grid4x;

    .drawer__list-each {
      width: 100%;
      padding: $grid2x 0;
      border-bottom: 1px solid $texteee;
      height: calc(#{$list} + #{$grid2x});

      .drawer__list-switch {
        width: 100%;
        height: $list;
        position: relative;
        display: inline-block;
        padding-top: $grid2x;

        .drawer__list-switch-text {
          padding-left: $grid8x;
        }

        .checkmark {
          top: -0px;
          position: absolute;
        }
      }

      .drawer__list-locale {
        height: calc(#{$list} + #{$grid4x});

        svg {
          color: $black54;
          position: absolute;
          padding-top: $grid2x;
          @include font-size(20px);
        }

        select {
          margin-top: -#{$grid};
          padding-left: $grid8x;
          width: calc(100% - #{$grid8x});
          height: calc(#{$list} + #{$grid4x});
        }
      }

      .drawer__list-ops {
        height: calc(#{$list} + #{$grid4x});

        svg {
          color: $black54;
          position: absolute;
          padding-top: $grid3x;
          @include font-size($grid4x);

          &.fa-share-square {
            padding-left: 2px;
          }
        }

        span {
          float: right;
          padding-top: $grid2x;
          width: calc(100% - #{$list});
        }
      }
    }
  }
}

.darkmode {
  .drawer__userInfo,
  .drawer__list-each {
    border-bottom: 1px solid $white10 !important;

    .drawer__list-locale {
      svg {
        color: $white87;
      }
    }
  }
}
</style>
