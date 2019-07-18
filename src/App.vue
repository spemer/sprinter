<template lang="pug">
  v-app
    div#app(:class="{'darkmode': this.$store.getters.getDarkmode, 'lightmode': !this.$store.getters.getDarkmode}")
      router-view
      vue-progress-bar
</template>

<style lang="scss">
</style>
