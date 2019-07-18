<template lang="pug">
  div#todolist

    BarLoader.spinner(
      v-if="!timeout"
    )

    div.todolist__list
      div.todolist__list-empty(
        v-if="todos.length === 0 && timeout"
      )
        p Create a new todo!
        i.fas.fa-arrow-down

      div.todolist__list-each(
        v-if="todos"
        v-for="todo in todos"
        :key="todo.id"
        :class="{'completed': todo.completed, 'removed': todo.removed}"
      )

        div.todolist__list-left(
          v-if="currentlyEditing !== todo.id"
        )
          label(
            :for="todo.id"
          )
            span {{ todo.text }}
          input(
            :id="todo.id"
            type="checkbox"
            v-model="todo.completed"
            @change="updateTodo(todo)"
          )
          span.checkmark

        div.todolist__list-right(
          v-if="currentlyEditing !== todo.id"
        )
          div.todolist__list-edit(
            v-if="!todo.completed"
            @click="editTodo(todo)"
          )
            i.fas.fa-pen
          div.todolist__list-remove(
            @click="removeTodo(todo, 2000)"
          )
            i.far.fa-trash-alt

        div.todolist__list-editing(
          v-else
        )
          form
            input(
              type="text"
              v-model.trim="todoEditText"
            )
            button(
              type="submit"
              @click.prevent="updateTodoText(todo)"
            ) Save
</template>

<script>
import { db, auth } from '@/firebase'
import { mapGetters } from 'vuex'
import { removeTodo } from '@/mixins/removeTodo'
import { BarLoader } from '@saeris/vue-spinners'

export default {
  data: _ => ({
    todos: [],
    currentlyEditing: null,
    todoEditText: '',
    timeout: false,
  }),

  firestore: _ => {
    return {
      todos: db.collection(auth.currentUser.uid).orderBy('createdAt', 'desc')
    }
  },

  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.timeout = true
      }, 1000)
    })
  },

  components: {
    BarLoader,
  },

  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },

  mixins: [
    removeTodo,
  ],

  methods: {
    editTodo(todo) {
      this.currentlyEditing = todo.id
      this.todoEditText = todo.text
    },

    updateTodoText(todo) {
      if (this.todoEditText.length > 0) {
        db.collection(auth.currentUser.uid).doc(this.currentlyEditing).update({
          text: this.todoEditText
        })
        .then(docRef => {
          console.log(docRef)
        })
        .catch(error => {
          console.error(error)
        })
        this.currentlyEditing = null
        this.todoEditText = ''
      }
    },

    updateTodo(todo) {
      db.collection(auth.currentUser.uid).doc(todo.id).update({...todo})
      .then(docRef => {
        console.log(docRef)
      })
      .catch(error => {
        console.error(error)
      })
    },
  },

}
</script>

<style lang="scss" scoped>
#todolist {
  $list: $grid10x;
  $line: $grid6x;

  padding-bottom: calc(#{$header} + #{$grid32x});

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid32x}) !important;
  }

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
      animation: popup 0.5s ease 1 forwards;

      @keyframes popup {
        from {
          opacity: 0;
          display: inline-block !important;
          @include transform(translateY(-#{$grid4x}));
        }

        to {
          opacity: 1;
          display: none !important;
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

      &.removed {
        animation: removing 0.5s ease 1 forwards;

        @keyframes removing {
          from {
            opacity: 1;
            @include transform(translateY(0));
          }

          to {
            opacity: 0;
            @include transform(translateY(-#{$grid4x}));
          }
        }
      }

      .todolist__list-editing {
        input {
          width: calc(100% - #{$list} - #{$list} - #{$grid6x});
          border: none;
          height: $list;
          outline: none;
          padding: 0 $grid4x;
          background-color: $black04;
          @include border-radius();
        }

        button {
          float: right;
          color: $brand;
          height: $list;
          font-weight: 700;
          background-color: $brand_16;
          width: calc(#{$list} + #{$grid6x});
          @include border-radius();
        }
      }

      .todolist__list-left {
        width: calc(100% - #{$grid8x} - #{$grid12x});

        label {
          left: 0;
          z-index: 1;
          opacity: 1;
          width: 100%;
          @include transition(opacity 0.25s ease);

          span {
            width: 100%;
            hyphens: auto;
            padding-top: $grid2x;
            padding-left: $grid8x;
            overflow-wrap: break-word;
            width: calc(100% - #{$grid8x});
            @include font-size($grid4x);
          }
        }

        span {
          display: inline-block;
        }
      }

      .todolist__list-right {
        top: 0;
        right: 0;
        float: right;
        height: $list;
        color: $black38;
        text-align: right;
        position: absolute;
        width: calc(#{$list} + #{$list});
        @include line-height($line);

        .todolist__list-edit {
          float: left;
          height: $list;
          text-align: center;
          width: calc(#{$list} + #{$grid2x});
        }

        .todolist__list-remove {
          float: right;
          height: $list;
          width: calc(#{$list} - #{$grid2x});
        }

        svg {
          color: $black38;
        }
      }

      width: 100%;
      height: auto;
      cursor: pointer;
      margin: $grid4x 0;
      position: relative;
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
