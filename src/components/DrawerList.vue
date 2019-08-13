<template lang="pug">
  div#drawerlist.drawer.bg
    div.drawer_userInfo
      img.drawer_userInfo-img(
        :src="setPhotoUrl(userInfo.provider)"
      )
      p.drawer_userInfo-displayName {{ userInfo.displayName }}
        font-awesome-icon.fab(
          :class="`fa-${getProvider(userInfo.provider)}`"
          :icon="['fab', `${getProvider(userInfo.provider)}`]"
        )
      p.drawer_userInfo-email {{ userInfo.email }}

    div.drawer_list
      div.drawer_list-container

        div.drawer_list-each
          div.drawer_list-darkmode
            div.drawer_list-switch(
              @click="setDarkmodeAction(!getDarkmode)"
            )
              span.drawer_list-switch-text {{ $t('darkmode') }}
              input(
                type="checkbox"
                :checked="getDarkmode"
              )
              span.checkmark

        div.drawer_list-each
          div.drawer_list-locale
            font-awesome-icon.fas(
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

        div.drawer_list-each
          div.drawer_list-ops(
            @click="$router.push({ path: '/opensource/' })"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'code']"
            )
            span {{ $t('ops') }}

        div.drawer_list-each
          div.drawer_list-ops(
            @click="$router.push({ path: '/privacy-policy/' })"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'user-shield']"
            )
            span {{ $t('privacyPolicy') }}

        div.drawer_list-each
          div.drawer_list-ops(
            @click="shareApi"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'share-square']"
            )
            span {{ $t('share') }}

        div.drawer_list-each
          div.drawer_list-ops(
            @click="$router.push({ path: '/delete-account/' })"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'user-slash']"
            )
            span {{ $t('deleteAccount') }}
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons/faUserSlash'
library.add(faFacebookSquare, faGoogle, faTwitter, faGlobe, faCode, faUserShield, faShareSquare, faUserSlash)

import firebase from 'firebase/app'
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      'setCurrentLangAction',
    ]),

    setCurrentLang (lang) {
      this.setCurrentLangAction(lang)
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

  .drawer_userInfo {
    z-index: 1;
    padding: $grid4x;
    border-bottom: 1px solid $texteee;

    .drawer_userInfo-img {
      width: $grid16x;
      height: $grid16x;
      display: inline-block;
      margin-bottom: $grid4x;
      @include border-radius($grid16x);
    }

    .drawer_userInfo-displayName,
    .drawer_userInfo-email {
      margin: 0 auto;
    }

    .drawer_userInfo-displayName {
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

    .drawer_userInfo-email {
      font-weight: 400;
      color: $black54;
    }
  }

  .drawer_list {
    $list: $grid8x;

    z-index: 0;
    overflow-x: scroll;
    padding: $grid2x $grid4x $grid4x;
    height: calc(100vh - #{$grid48x} - #{$header} - #{$grid20x} - #{$grid2x});

    .drawer_list-container {

      .drawer_list-each {
        width: 100%;
        cursor: pointer;
        padding: $grid2x 0;
        border-bottom: 1px solid $texteee;
        height: calc(#{$list} + #{$grid2x});

        .drawer_list-switch {
          width: 100%;
          height: $list;
          position: relative;
          display: inline-block;
          padding-top: $grid2x;

          .drawer_list-switch-text {
            padding-left: $grid8x;
          }

          .checkmark {
            top: -0px;
            position: absolute;
          }
        }

        .drawer_list-locale {
          position: relative;
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

        .drawer_list-ops {
          position: relative;
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
}

.darkmode {
  .drawer_userInfo,
  .drawer_list-each {
    border-bottom: 1px solid $white10 !important;

    .drawer_list-locale {
      svg {
        color: $white87;
      }
    }
  }
}
</style>
