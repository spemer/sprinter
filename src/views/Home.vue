<template lang="pug">
  div#home
    div.container
      div.home__container
        h1.home__container-title TODO
      AddTodo
      button(
        @click="logout"
      ) Logout
</template>

<script>
import { mapState } from 'vuex'
import AddTodo from '@/components/AddTodo'
import { logout } from '@/mixins/logout'

export default {
  name: 'home',

  computed: {
    ...mapState([
      'user',
    ]),
  },

  mixins: [
    logout,
  ],

  mounted () {
    console.log(this.user.displayName)
  },

  components: {
    AddTodo,
  },
}
</script>

<style lang="scss" scoped>
#home {
  .home__container {
    .home__container-title {
      @include font-size($grid6x);
    }
  }
}
</style>
