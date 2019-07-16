<template lang="pug">
  div#home
    Header(
      headerTitle="TODO"
    )
    div.container
      div.home__container
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

export default {
  name: 'home',

  computed: {
    ...mapGetters([
      'getUser',
      'getStatus',
    ]),
  },

  methods: {
    logout() {
      this.$store.dispatch('signOutAction')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },

  mounted () {
    // console.log(this.getUser.displayName)
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
  }
}
</style>
