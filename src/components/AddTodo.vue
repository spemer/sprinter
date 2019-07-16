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
import { todosCollection } from '@/firebase'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

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

  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },

  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      return (user)
        && this.SET_CURRENT_USER(user.uid)
    })

    console.log(todosCollection.where('uid', '==', this.currentUser))
  },

  methods: {
    ...mapMutations([
      'SET_CURRENT_USER',
    ]),

    removeItem (id) {
      todosCollection.doc(id.id).delete()
      .then( _ => {
        console.log(`${id.text} Removed`)
      })
    },

    addTodo () {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        uid: this.currentUser,
        createdAt: new Date(),
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
      this.newTodo = ''
    },

    updateTodo(todo) {
      todosCollection.doc(todo.id).update({...todo})
      .then(docRef => {
        console.log('Updated document with ID: ', todo.id)
      })
      .catch(error => {
        console.error('Error updating document: ', error)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
