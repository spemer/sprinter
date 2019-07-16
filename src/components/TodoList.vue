<template lang="pug">
  div#todolist
    div.todolist_list
      div.todolist_list-each(
        v-for="todo in todos"
        :key="todo.id"
      )
        div.todolist_list-left
          label(
            :for="todo.id"
          ) {{ todo.text }}
          input(
            :id="todo.id"
            type="checkbox"
            v-model="todo.completed"
            @change="updateTodo(todo)"
          )
          span.checkmark
        div.todolist_list-right(
          @click="handleRemove(todo)"
        )
          i.far.fa-trash-alt
</template>

<script>
import { db, auth } from '@/firebase'
import { mapGetters } from 'vuex'
import { removeItem } from '@/mixins/removeItem'

export default {
  data: _ => ({
    todos: [],
    isActive: true,
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

  mixins: [
    removeItem,
  ],

  methods: {
    handleRemove(todo) {
      this.removeItem(todo)
    },

    updateTodo(todo) {
      db.collection(auth.currentUser.uid).doc(todo.id).update({...todo})
      .then(docRef => {
        console.log('Updated document with ID: ', todo.id)
      })
      .catch(error => {
        console.error('Error updating document: ', error)
      });
    }
  },

}
</script>

<style lang="scss" scoped>
#todolist {
  padding-bottom: calc(#{$header} + #{$grid8x});
  -webkit-tap-highlight-color: transparent;

  .todolist_list {
    padding: 0;

    .removed {
      animation: popup 0.5s ease 1 forwards;

      @keyframes popup {
        from {
          opacity: 1;
          @include transform(translateY(0px));
        }

        to {
          opacity: 0;
          @include transform(translateY($grid4x));
        }
      }
    }

    .todolist_list-each {
      position: relative;
      animation: popup 0.5s ease 1 forwards;

      @keyframes popup {
        from {
          opacity: 0;
          @include transform(translateY(-#{$grid4x}));
        }

        to {
          opacity: 1;
          @include transform(translateY(0));
        }
      }

      .todolist_list-left {
        height: $grid12x;
        position: absolute;
        display: inline-block;
        width: calc(100% - #{$grid12x} - #{$grid8x});
        @include line-height($grid8x);

        label {
          left: 0;
          width: 100%;
          height: $grid12x;
          position: absolute;
          display: inline-block;
          padding-left: $grid8x;
        }

        span {
          display: inline-block;
        }
      }

      .todolist_list-right {
        position: absolute;
        width: $grid12x;
        color: $black38;
        height: $grid12x;
        text-align: right;
        right: 0;
        display: inline-block;
        @include line-height($grid8x);
      }

      cursor: pointer;
      position: relative;
      margin-top: $grid4x;
      width: 100%;
      height: $grid12x;
      display: block;
      -webkit-user-select: none !important;
      -khtml-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      -o-user-select: none !important;
      user-select: none !important;
      @include font-size($grid4x);

      input[type='checkbox'] {
        height: 0 !important;
        width: 0 !important;
        -ms-filter: 'alpha(opacity=0)' !important;
        filter: alpha(opacity=0) !important;
        -webkit-opacity: 0 !important;
        -khtml-opacity: 0 !important;
        -moz-opacity: 0 !important;
        -ms-opacity: 0 !important;
        -o-opacity: 0 !important;
        opacity: 0 !important;
        -webkit-appearance: none !important;
        -khtml-appearance: none !important;
        -moz-appearance: none !important;
        -ms-appearance: none !important;
        -o-appearance: none !important;
        appearance: none !important;
      }

      .checkmark {
        top: 2px;
        left: 0;
        width: $grid5x;
        height: $grid5x;
        position: absolute;
        background-color: $black04;
        margin-top: $grid3x;
        @include border-radius($grid);
        @include transition(all 0.1s ease);
      }

      &:hover input ~ .checkmark {
        background-color: $black04;
      }

      input:checked ~ .checkmark {
        background-color: $brand;
      }

      .checkmark:after {
        content: '';
        display: none;
        position: absolute;
      }

      input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        top: 3px;
        right: 7px;
        width: $grid;
        height: 9px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        @include transform(rotate(45deg));
      }
    }
  }
}
</style>
