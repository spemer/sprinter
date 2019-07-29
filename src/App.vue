<template>
  <v-app>
    <div id="app"
      :class="{
        'noscroll': this.$store.getters.getBottomSheet,
        'darkmode': this.$store.getters.getDarkmode,
        'lightmode': !this.$store.getters.getDarkmode
      }">
      <router-view></router-view>
      <vue-progress-bar></vue-progress-bar>
    </div>
  </v-app>
</template>

<script>
import { globalVar } from '@/globalVar'

export default {
  metaInfo: _ => ({
    title: globalVar.appName,
  }),
}
</script>

<style lang="scss">
</style>
