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
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
library.add(faTimes);

import { globalVar } from '@/globalVar'

export default {
  name: 'privacy',

  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('privacyPolicy')}`,
      titleTemplate: `%s`,
    }
  },

  components: {
    Header: () => import(/* webpackChunkName: 'components/Header' */ '@/components/Header')
  },
}
</script>
