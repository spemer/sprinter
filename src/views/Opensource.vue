<template lang="pug">
  div#opensource
    Header(
      :headerTitle="$t('ops')"
    )
      div.header__left(
        slot="header__left"
        @click="$router.push('/')"
      )
        i.fas.fa-times

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
import Header from '@/components/Header'
import OPS_ENTRIES from '@/opensource/list.json'
import { globalVar } from '@/globalVar'

export default {
  name: 'opensource',

  metaInfo () {
    return {
      title: globalVar.appName,
      titleTemplate: `%s - ${this.$t('ops')}`,
    }
  },

  methods: {
    openNewTab: href => {
      window.open(href)
    }
  },

  computed: {
    opsEntries: _ => {
      return OPS_ENTRIES
    },
  },

  components: {
    Header,
  },

}
</script>

<style lang="scss" scoped>
#opensource {
  padding-left: $grid4x;
  padding-right: $grid4x;
  padding-top: calc(#{$header} + #{$grid2x});
  padding-bottom: calc(#{$header} + #{$grid32x});

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid32x}) !important;
  }

  .notices__list {
    p {
      cursor: pointer;
      font-weight: 700;
      margin-bottom: $grid4x;
      @include font-size($grid5x);

      svg {
        margin-left: $grid2x;
        color: $white54 !important;
      }
    }

    span {
      display: inline-block;
      margin-bottom: $grid4x;
    }
  }
}
</style>
