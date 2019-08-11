<template lang="pug">
  div#drawerlist.drawer.bg
    div.drawer__userInfo
      img.drawer__userInfo-img(
        :src="setPhotoUrl(userInfo.provider)"
      )
      p.drawer__userInfo-displayName {{ userInfo.displayName }}
        font-awesome-icon.fab(
          :class="`fa-${getProvider(userInfo.provider)}`"
          :icon="['fab', `${getProvider(userInfo.provider)}`]"
        )
      p.drawer__userInfo-email {{ userInfo.email }}

    div.drawer__list
      div.drawer__list-each
        div.drawer__list-darkmode
          div.drawer__list-switch(
            @click="setDarkmodeAction(!getDarkmode)"
          )
            span.drawer__list-switch-text {{ $t('darkmode') }}
            input(
              type="checkbox"
              :checked="getDarkmode"
            )
            span.checkmark

      div.drawer__list-each
        div.drawer__list-locale
          font-awesome-icon.fas.fa-globe(
            :icon="['fas', 'globe']"
          )
          select(
            v-model="$i18n.locale"
            @change="setCurrentLang($i18n.locale)"
          )
            option(
              v-for="(lang, index, key) in getLangs"
              :key="key"
              :value="index"
            ) {{ lang }}

      div.drawer__list-each
        div.drawer__list-ops(
          @click="$router.push({ path: '/opensource/' })"
        )
          font-awesome-icon.fas(
            :icon="['fas', 'code']"
          )
          span {{ $t('ops') }}

      div.drawer__list-each
        div.drawer__list-ops(
          @click="$router.push({ path: '/privacy-policy/' })"
        )
          font-awesome-icon.fas(
            :icon="['fas', 'user-shield']"
          )
          span {{ $t('privacyPolicy') }}

      div.drawer__list-each
        div.drawer__list-ops(
          @click="shareApi"
        )
          font-awesome-icon.fas(
            :icon="['fas', 'share-square']"
          )
          span {{ $t('share') }}
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare"
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe"
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode"
import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield"
import { faShareSquare } from "@fortawesome/free-solid-svg-icons/faShareSquare"
library.add(faFacebookSquare, faGoogle, faTwitter, faGlobe, faCode, faUserShield, faShareSquare)

import firebase from 'firebase/app'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { logout } from '@/mixins/logout'
import { toast } from '@/mixins/toast'
import { shareApi } from '@/mixins/shareApi'
import { auth } from '@/firebase'

export default {
  name: 'home',

  data: () => ({
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
    ...mapActions([
      'setDarkmodeAction',
    ]),

    ...mapMutations([
      'SET_CURRENT_LANG',
    ]),

    setCurrentLang (lang) {
      this.SET_CURRENT_LANG(lang)
      localStorage.Lang = lang
    },

    setPhotoUrl (provider) {
      return (provider === 'facebook.com')
        ? `${auth.currentUser.photoURL}/picture?height=500`
        : auth.currentUser.photoURL
    },

    getProvider (provider) {
      if (provider === 'facebook.com') {
        return 'facebook-square'
      }
      else if (provider === 'google.com') {
        return 'google'
      }
      else if (provider === 'twitter.com') {
        return 'twitter-square'
      }
    },
  },

  mixins: [
    logout,
    shareApi,
  ],

  components: {
    Header: () => import(/* webpackChunkName: 'components/Header' */ '@/components/Header'),
    AddTodo: () => import(/* webpackChunkName: 'components/AddTodo' */ '@/components/AddTodo'),
    TodoList: () => import(/* webpackChunkName: 'components/TodoList' */ '@/components/TodoList'),
    DrawerList: () => import(/* webpackChunkName: 'components/DrawerList' */ '@/components/DrawerList'),
  },

}
</script>

<style lang="scss" scoped>
.v-overlay {
  width: 200vw !important;
  height: 200vh !important;
  position: fixed !important;
  overflow: hidden !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.drawer {
  width: 100%;
  @include user-select();

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
      cursor: pointer;
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
