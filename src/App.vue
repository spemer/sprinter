<template lang="pug">
  v-app(:dark="getDarkmode")
    div#app(:class="{'noscroll': getBottomSheet, 'darkmode': getDarkmode, 'lightmode': !getDarkmode}")
      router-view
      vue-progress-bar
</template>

<script>
import { mapGetters } from 'vuex'
import { globalVar } from '@/globalVar'

export default {
  computed: {
    ...mapGetters([
      'getBottomSheet',
      'getDarkmode',
      'getCurrentLang',
    ])
  },

  metaInfo () {
    return {
      title: globalVar.appName,
      htmlAttrs: {
        lang: this.getCurrentLang,
      },
    }
  },
}
</script>

<style lang="scss">
</style>
