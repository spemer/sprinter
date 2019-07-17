<template lang="pug">
  div#home
    Header(
      headerTitle="TODO"
    )
      div.header__right(
        slot="header__right"
        @click="logout"
      ) Logout

    div.container
      div.home__container
        TodoList

    AddTodo

    v-dialog.modal(:width="320")
</template>

<script>
import firebase from 'firebase/app'
import Header from '@/components/Header'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import { mapGetters } from 'vuex'
import { logout } from '@/mixins/logout'

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

  mixins: [
    logout,
  ],

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
