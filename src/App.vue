<template lang="pug">
  v-app(:class="{'darkmode': this.$store.getters.getDarkmode, 'lightmode': !this.$store.getters.getDarkmode}")
    div#app
      router-view
      vue-progress-bar
</template>

<style lang="scss">
</style>
