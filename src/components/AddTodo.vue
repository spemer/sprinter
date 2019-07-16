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
        //- span(
        //-   @click="removeItem"
        //- ) &nbsp;remove
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

    console.log(`uid: ${this.currentUser}`)
  },

  methods: {
    ...mapMutations([
      'SET_CURRENT_USER',
    ]),

    // removeItem () {
    //   todosCollection.doc(docRef.id).delete()
    // },

    addTodo () {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        uid: this.currentUser,
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
