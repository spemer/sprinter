<template lang="pug">
  div#home
    Header(
      headerTitle="TODO"
    )
    div.container
      div.home__container
        h1.home__container-title TODOS
      AddTodo
      button(
        @click="logout"
      ) Logout
</template>

<script>
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import { mapGetters } from 'vuex'
import { todosCollection } from '@/firebase'
import { logout } from '@/mixins/logout'

export default {
  name: 'home',

  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },

  mixins: [
    logout,
  ],

  mounted () {
    console.log(this.currentUser.displayName)
  },

  components: {
    Header,
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
