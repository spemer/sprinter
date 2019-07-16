<template lang="pug">
  div#addTodo
    div.addTodo__container
      form.addTodo__form
        div.addTodo__form-input
          input(
            type="text"
            autofocus="true"
            v-model.trim="newTodo"
            placeholder="New todo"
          )
        div.addTodo__form-btn
          button(
            type="submit"
            @click.prevent="addTodo()"
          )
            i.fas.fa-plus
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'
import { db, auth } from '@/firebase'

export default {
  data: _ => ({
    newTodo: '',
    todos: [],
  }),

  firestore: _ => {
    return {
      todos: db.collection(auth.currentUser.uid).orderBy('createdAt', 'desc')
    }
  },

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
      if (this.newTodo) {
        db.collection(auth.currentUser.uid).add({
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
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#addTodo {
  $btn: $grid12x;

  bottom: 0;
  width: 100%;
  position: fixed;
  background-color: #fff;
  @include drop-shadow();

  .addTodo__container {
    padding: $grid4x;

    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid4x}) !important;
    }

    .addTodo__form {
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
        }
      }
    }
  }
}
</style>
