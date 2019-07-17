<template lang="pug">
  div#todolist
    div.todolist__list
      div.todolist__list-empty(
        v-if="todos.length == 0"
      )
        p Create a new todo!
        i.fas.fa-arrow-down
      div.todolist__list-each(
        v-if="todos"
        v-for="todo in todos"
        :key="todo.id"
        :class="{'completed': todo.completed}"
      )
        div.todolist__list-left
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
        div.todolist__list-right(
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
  $list: $grid10x;
  $line: $grid6x;

  padding-bottom: calc(#{$header} + #{$grid8x});

  .todolist__list {
    padding: 0;

    .todolist__list-empty {
      text-align: center;
      width: 100%;
      opacity: 0.38;
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translateX(-50%) translateY(-75%);

      p,
      svg {
        @include font-size($grid6x);
      }

      svg {
        -webkit-animation: slide 2.5s ease infinite;
        -moz-animation: slide 2.5s ease infinite;
        -o-animation: slide 2.5s ease infinite;
        animation: slide 2.5s ease infinite;

        @keyframes slide {
          0% {
            transform: translateY($grid);
          }
          50% {
            transform: translateY($grid3x);
          }
          100% {
            transform: translateY($grid);
          }
        }
      }
    }

    .removed {
      -webkit-animation: popup 0.5s ease 1 forwards;
      -moz-animation: popup 0.5s ease 1 forwards;
      -o-animation: popup 0.5s ease 1 forwards;
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

    .todolist__list-each {
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

      &.completed {
        .todolist__list-left {
          label {
            opacity: 0.38;
            text-decoration: line-through;
          }
        }
      }

      .todolist__list-left {
        height: $list;
        position: absolute;
        display: inline-block;
        width: calc(100% - #{$grid12x} - #{$grid8x});
        @include line-height($line);

        label {
          left: 0;
          opacity: 1;
          width: 100%;
          height: $list;
          position: absolute;
          display: inline-block;
          padding-left: $grid8x;
          @include transition(opacity 0.25s ease);
        }

        span {
          display: inline-block;
        }
      }

      .todolist__list-right {
        right: 0;
        height: $list;
        width: $grid12x;
        color: $black38;
        text-align: right;
        position: absolute;
        display: inline-block;
        @include line-height($line);
      }

      width: 100%;
      height: $list;
      display: block;
      cursor: pointer;
      position: relative;
      margin-top: $grid4x;
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
        margin-top: $grid2x;
        @include border-radius($grid);
        @include transition(all 0.25s ease);
      }

      &:hover input ~ .checkmark {
        background-color: $black04;
      }

      input:checked ~ .checkmark {
        background-color: $brand;
      }

      .checkmark:after {
        opacity: 0;
        content: '';
        position: absolute;
        @include transition(all 0.25s ease);
      }

      input:checked ~ .checkmark:after {
        opacity: 1;
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
