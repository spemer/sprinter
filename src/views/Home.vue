<template lang="pug">
  div#home
    div.home__container Home
    AddTodo
</template>

<script>
import AddTodo from '@/components/AddTodo'

export default {
  name: 'home',

  components: {
    AddTodo,
  },
}
</script>

<style lang="scss" scoped>
</style>
