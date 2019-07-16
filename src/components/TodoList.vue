<template lang="pug">
  //- div#todolist
    ul
      li(
        v-for="todo in todos"
        :key="todo.id"
      ) {{ todo.text }}
        input(
          type="checkbox"
          v-model="todo.completed"
          @change="updateTodo(todo)"
        )
        span(
          @click="removeItem(todo)"
        ) &nbsp;remove
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
