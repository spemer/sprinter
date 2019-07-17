<template lang="pug">
  div#addTodo
    div.addTodo__container
      form.addTodo__form
        div.addTodo__form-input
          input(
            type="text"
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
    colorset: [
      '39CCCC',
      'FF851B',
      '85144b',
      '0074D9',
      'FFDC00',
      '2ECC40',
      '327DE1',
      '3D9970',
      '8E209D',
    ],
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

    // .addTodo__colorset {
    //   overflow-x: scroll;
    //   display: inline-block;
    //   padding-bottom: $grid2x;

    //   .addTodo__colorset-each {
    //     width: $grid4x;
    //     height: $grid4x;
    //     margin-right: $grid4x;
    //     display: inline-block;
    //     background-color: #fff;
    //     @include border-radius(100%);
    //   }
    // }

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
