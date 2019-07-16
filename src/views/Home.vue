<template lang="pug">
  div#home
    Header(
      headerTitle="TODO"
    )

    div.container
      div.home__container
        TodoList
        button(
          @click="logout"
        ) Logout

    AddTodo
</template>

<script>
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'home',

  computed: {
    ...mapGetters([
      'getUser',
      'getStatus',
    ]),
  },

  mounted () {
    console.log(this.getUser)
  },

  methods: {
    logout() {
      this.$store.dispatch('signOutAction')
      .then(() => {
        this.$router.replace('/login')
      })
    }
  },

  components: {
    Header,
    AddTodo,
    TodoList,
  },
}
</script>

<style lang="scss" scoped>
#home {
  .home__container {
    padding-top: $grid16x;
  }
}
</style>
