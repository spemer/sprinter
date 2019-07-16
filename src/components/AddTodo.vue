<template lang="pug">
  div#addTodo
    form.addTodo__form
      div.addTodo__form-input
        input(
          type="text"
          autofocus="true"
          v-model.trim="newTodo"
          placeholder="Todo"
        )
      div.addTodo__form-btn
        button(
          type="submit"
          @click.prevent="addTodo()"
        )
          i.fas.fa-plus
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
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'
import { todosCollection } from '@/firebase'
import { removeItem } from '@/mixins/removeItem'

export default {
  data: _ => ({
    newTodo: '',
    todos: [],
  }),

  firestore() {
    return {
      todos: todosCollection.orderBy('createdAt', 'desc')
    }
  },

  mixins: [
    removeItem,
  ],

  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },

  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      return (user)
        && this.SET_USER(user.uid)
    })
  },

  methods: {
    ...mapMutations([
      'SET_USER',
    ]),

    addTodo () {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        uid: this.getUser,
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
#addTodo {
  $btn: $grid12x;
  margin-top: calc(#{$header} + #{$grid2x});

  .addTodo__form {
    width: 100%;
    height: $grid12x;

    .addTodo__form-input,
    .addTodo__form-btn {
      display: inline-block;
    }

    .addTodo__form-input {
      width: calc(100% - #{$btn} * 2);

      input {
        width: 100%;
        border: none;
        outline: none;
        height: $btn;
        padding: 0 $grid4x;
        background-color: $black04;
        @include border-radius();
      }
    }

    .addTodo__form-btn {
      width: $btn;
      float: right;

      button {
        width: 100%;
        height: $btn;
        border: none;
        color: #fff;
        display: inline-block;
        background-color: $brand;
        @include border-radius(100%);

        svg {
          padding-top: $grid;
        }
      }
    }
  }
}
</style>
