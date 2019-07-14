<template lang="pug">
  div#addTodo
    form
      input(
        v-model="newTodo"
        type="text"
      )
      button(
        type="submit"
        @click.prevent="addTodo()"
      ) Add
    ul
      li(
        v-for="todo in todos"
        :key="todo.id"
      ) {{ todo.text }}
</template>

<script>
import { todosCollection } from '@/firebase'

export default {
  data: _ => ({
    newTodo: '',
    todos: [],
  }),

  firestore: _ => {
    return {
      todos: todosCollection.orderBy('createdAt', 'desc')
    }
  },

  methods: {
    addTodo () {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        createdAt: new Date(),
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
      this.newTodo = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
