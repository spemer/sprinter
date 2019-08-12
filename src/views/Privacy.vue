<template lang="pug">
  div#privacy.bg
    Header(
      :headerTitle="$t('privacyPolicy')"
    )
      div.header__left(
        slot="header__left"
        @click="$router.replace('/')"
      )
        button
          font-awesome-icon.fas(
            :icon="['fas', 'times']"
          )

    div
      h1 {{ $t('privacyPolicy') }}
      p {{ $t('p_header') }}

      div.divider

      h3 {{ $t('p-1-title') }}
      p {{ $t('p-1-subtitle') }}
      p {{ $t('p-1-essentialInformation-title') }}
      ol
        li {{ $t('p-1-essentialInformation-desc_1') }}
        li {{ $t('p-1-essentialInformation-desc_2') }}

      div.divider

      h3 {{ $t('p-2-pop-title') }}
      p {{ $t('p-2-pop-desc') }}

      div.divider

      h3 {{ $t('p-3-dop-title') }}
      p {{ $t('p-3-dop-subtitle') }}
      ul
        li {{ $t('p-3-dop-desc_1') }}
        li {{ $t('p-3-dop-desc_2') }}

      div.divider

      h3 {{ $t('p-4-ros-title') }}
      p {{ $t('p-4-ros-desc') }}

      div.divider

      h3 {{ $t('p-5-pim-title') }}
      p {{ $t('p-5-pim-subtitle') }}
      ul
        li {{ $t('p-5-pim-desc_1') }}
        li {{ $t('p-5-pim-desc_2') }}
        li {{ $t('p-5-pim-desc_3') }}
        li {{ $t('p-5-pim-desc_4') }} {{ mailTo }}
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes"
library.add(faTimes)

import { globalVar } from '@/globalVar'

export default {
  name: 'privacy',

  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('privacyPolicy')}`,
      titleTemplate: `%s`,
    }
  },

  data: () => ({
    mailTo: globalVar.mailTo
  }),

  components: {
    Header: () => import(/* webpackChunkName: 'components/Header' */ '@/components/Header')
  },
}
</script>

<style lang="scss" scoped>
#privacy {
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

  h1 {
    @include font-size($grid8x)
  }

  h3 {
    @include font-size($grid6x)
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: $grid16x 0;
  }
}

.lightmode {
  .divider {
    border-bottom: 1px solid $texteee;
  }
}

.darkmode {
  .divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
