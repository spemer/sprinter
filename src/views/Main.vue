<template lang="pug">
  div#main
    div.main__container Main
    AddTodo
</template>

<script>
import AddTodo from '@/components/AddTodo'

export default {
  name: 'main',

  components: {
    AddTodo,
  },
}
</script>

<style lang="scss" scoped>
</style>
