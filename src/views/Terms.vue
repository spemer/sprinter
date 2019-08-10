<template lang="pug">
  div#terms
</template>

<script>
import { globalVar } from '@/globalVar'

export default {
  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('privacyPolicy')}`,
      titleTemplate: `%s`,
    }
  },
}
</script>
