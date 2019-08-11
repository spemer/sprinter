<template lang="pug">
  div#opensource.bg
    Header(
      :headerTitle="$t('ops')"
    )
      div.header__left(
        slot="header__left"
        @click="$router.replace('/')"
      )
        button
          font-awesome-icon.fas(
            :icon="['fas', 'times']"
          )

    div(
      v-for="(section, index) in Object.keys(opsEntries)"
      :key="index"
    )
      div.notices__list(
        v-for="entry in opsEntries[section]"
        :key="entry.id"
      )
        p(
          @click="openNewTab(entry.href)"
        ) {{ entry.id }}
          i.fas.fa-external-link-square-alt
        span {{ entry.desc}}
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
library.add(faTimes);

import OPS_ENTRIES from '@/opensource/list.json'
import { globalVar } from '@/globalVar'

export default {
  name: 'opensource',

  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('ops')}`,
      titleTemplate: `%s`,
    }
  },

  computed: {
    opsEntries: _ => {
      return OPS_ENTRIES
    },
  },

  methods: {
    openNewTab: href => {
      return window.open(href)
    }
  },

  components: {
    Header :() => import(/* webpackChunkName: 'components/Header' */ '@/components/Header')
  },

}
</script>

<style lang="scss" scoped>
#opensource {
  padding-left: $grid4x;
  padding-right: $grid4x;
  padding-top: calc(#{$header} + #{$grid4x});
  padding-bottom: calc(#{$header} + #{$grid32x});
  @include user-select();

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + #{$header}) !important;
  }

  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: calc(
      env(safe-area-inset-top) + #{$header} + #{$grid4x}
    ) !important;
  }

  .notices__list {
    p {
      cursor: pointer;
      font-weight: 700;
      margin-bottom: $grid2x;
      @include font-size($grid5x);

      svg {
        margin-left: $grid2x;
        color: $white54 !important;
      }
    }

    span {
      display: inline-block;
      margin-bottom: $grid8x;
    }
  }
}
</style>
