<template lang="pug">
  div#todolist.bg
    BarLoader.spinner.bg(
      v-if="!timeout"
    )

    div.todolist_list
      div.todolist_list-empty(
        v-if="todos.length === 0 && timeout"
      )
        p {{ $t('emptyTodo') }}
        i.fas.fa-arrow-down

      div.todolist_list-each(
        v-if="todos"
        v-for="todo in todos"
        ref="todoListEach"
        :key="todo.id"
        :class="{'completed': todo.isCompleted, 'removed': todo.isRemoved}"
      )

        div.todolist_list-left(
          v-if="currentlyEditing !== todo.id"
        )
          label(
            :for="todo.id"
          )
            div.todolist_list-left-color(
              ref="todoListEachColor"
              :style="{'background-color': todo.color}"
            )
            span {{ todo.text }}
          input(
            :id="todo.id"
            type="checkbox"
            v-model="todo.isCompleted"
            @change="updateTodo(todo)"
          )
          span.checkmark

        div.todolist_list-right(
          v-if="currentlyEditing !== todo.id"
        )
          div.todolist_list-edit(
            v-if="!todo.isCompleted"
            @click="editTodo(todo)"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'pen']"
            )
          div.todolist_list-remove(
            @click="removeTodo(todo, 2500)"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'trash-alt']"
            )

        div.todolist_list-editing(
          v-else
        )
          form
            input(
              type="text"
              v-model.trim="todoEditText"
            )
            button.todolist_list-undo(
              type="button"
              @click="undoEditText(todo)"
            )
              font-awesome-icon.fas(
                :icon="['fas', 'undo']"
              )
            button.todolist_list-save(
              type="submit"
              @click.prevent="updateTodoText(todo)"
            ) {{ $t('save') }}
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
library.add(faPen, faUndo, faTrashAlt)

import { db, auth } from '@/firebase'
import { mapGetters, mapMutations } from 'vuex'
import { removeTodo } from '@/mixins/removeTodo'
import { BarLoader } from '@saeris/vue-spinners'

export default {
  data: () => ({
    todos: [],
    currentlyEditing: null,
    todoEditText: '',
    timeout: false,
    editTextChanged: true,
  }),

  firestore: () => {
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

  watch: {
    getSelectedColors () {
      let todoListEach = this.$refs.todoListEach
      let getTodoColor = this.$refs.todoListEachColor
      for (let j = 0; j < getTodoColor.length; j++) {
        if (this.getSelectedColors.includes(getComputedStyle(getTodoColor[j]).backgroundColor)) {
          todoListEach[j].style.display = 'block'
        }
        else {
          todoListEach[j].style.display = 'none'
        }
      }
    },
    deep: true,
  },

  computed: {
    ...mapGetters([
      'getUser',
      'getTodos',
      'getColors',
      'getSelectedColors',
    ]),
  },

  mixins: [
    removeTodo,
  ],

  methods: {
    ...mapMutations([
      'SET_TODOS',
      'SET_COLORED_TODOS_LENGTH',
    ]),

    undoEditText (todo) {
      this.todoEditText = todo.text
    },

    editTodo(todo) {
      this.currentlyEditing = todo.id
      this.todoEditText = todo.text
    },

    updateTodoText(todo) {
      if (this.todoEditText.length > 0) {
        db.collection(auth.currentUser.uid)
          .doc(this.currentlyEditing)
          .update({
            text: this.todoEditText
          })
        this.currentlyEditing = null
        this.todoEditText = ''
      } else {
        this.currentlyEditing = null
        this.todoEditText = todo.text
      }
    },

    updateTodo(todo) {
      db.collection(auth.currentUser.uid)
        .doc(todo.id)
        .update({...todo})
    },
  },

  components: {
    BarLoader,
  },

}
</script>

<style lang="scss" scoped>
#todolist {
  $list: $grid10x;
  $line: $grid6x;

  padding-bottom: calc(#{$header} + #{$grid40x});

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid40x}) !important;
  }

  .todolist_list {
    padding: 0;

    .todolist_list-empty {
      text-align: center;
      width: 100%;
      opacity: 0.38;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translateX(-50%) translateY(-60%);

      p,
      svg {
        @include font-size($grid6x);
      }

      p {
        margin-bottom: $grid4x;
      }

      svg {
        @include animation(slide 2.5s ease infinite);

        @keyframes slide {
          0% {
            @include transform(translateY(0));
          }
          50% {
            @include transform(translateY($grid4x));
          }
          100% {
            @include transform(translateY(0));
          }
        }
      }
    }

    .todolist_list-each {
      @include animation(addedTodo 0.25s normal forwards ease);

      @keyframes addedTodo {
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
        .todolist_list-left {
          label {
            opacity: 0.38;

            span {
              text-decoration: line-through;
            }
          }
        }
      }

      &.removed {
        display: none;
      }

      .todolist_list-editing {
        input {
          border: none;
          outline: none;
          padding: 0 $grid10x 0 $grid4x;
          height: $list !important;
          background-color: $black04;
          width: calc(100% - #{$list} - #{$list} - #{$grid14x});
          @include border-radius();
        }

        .todolist_list-undo {
          top: 0;
          width: $list;
          right: $grid20x;
          position: absolute;
          height: $list !important;
        }

        .todolist_list-save {
          float: right;
          color: $brand;
          font-weight: 700;
          height: $list !important;
          background-color: $brand_16;
          width: calc(#{$list} + #{$grid8x});
          @include border-radius();
        }
      }

      .todolist_list-left {
        width: calc(100% - #{$grid8x} - #{$grid12x});

        .todolist_list-left-color {
          top: $grid4x;
          width: $grid2x;
          height: $grid2x;
          position: absolute;
          margin-left: $grid8x;
          display: inline-block;
          @include border-radius();
        }

        label {
          left: 0;
          z-index: 2;
          opacity: 1;
          width: 100%;
          @include transition(opacity 0.25s ease);

          span {
            z-index: 1;
            width: 100%;
            hyphens: auto;
            padding-top: $grid2x;
            padding-left: $grid12x;
            overflow-wrap: break-word;
            width: calc(100% - #{$grid12x});
            @include font-size($grid4x);
          }
        }

        span {
          z-index: 0;
          display: inline-block;
        }
      }

      .todolist_list-right {
        top: 0;
        right: 0;
        float: right;
        height: $list;
        color: $black38;
        text-align: right;
        position: absolute;
        width: calc(#{$list} + #{$list});
        @include line-height($line);

        .todolist_list-edit {
          float: left;
          height: $list;
          text-align: center;
          width: calc(#{$list} + #{$grid2x});
        }

        .todolist_list-remove {
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
      @include user-select();
      @include font-size($grid4x);
    }
  }
}
</style>
