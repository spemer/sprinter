<template lang="pug">
  div#addTodo.bg
    div.addTodo__container
      form.addTodo__form
        div.addTodo__color
          div.addTodo__color-each(
            v-for="(color, i) in getColors"
            @click="setColor(color, i)"
            :style="{ border: '6px solid ' + `${color[0]}` }"
          )
        div.addTodo__form-input
          input(
            type="text"
            v-model.trim="newTodo"
            :placeholder="$t('newTodo')"
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
import { toast } from '@/mixins/toast'

export default {
  data: _ => ({
    newTodo: '',
    todos: [],
    selectedColor: 'transparent',
  }),

  firestore: _ => {
    return {
      todos: db.collection(auth.currentUser.uid).orderBy('createdAt', 'desc')
    }
  },

  computed: {
    ...mapGetters([
      'getUser',
      'getColors',
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

    setColor (color, i) {
      let el = document.querySelectorAll('.addTodo__color-each')

      for (let j = 0; j < el.length; j++) {
        if (i === j) {
          el[i].style.backgroundColor = this.getColors[i][0]
        } else {
          el[j].style.backgroundColor = 'transparent'
        }
      }
      this.selectedColor = this.getColors[i][0]
      this.getColors[i][1] = this.getColors[i][0]
    },

    addTodo () {
      if (this.newTodo) {
        db.collection(auth.currentUser.uid).add({
          text: this.newTodo,
          completed: false,
          removed: false,
          id: this.todos.length,
          uid: this.getUser,
          color: this.selectedColor,
          createdAt: new Date(),
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })

        this.newTodo = ''
        this.selectedColor = 'transparent'

        let el = document.querySelectorAll('.addTodo__color-each');
        [...el].forEach(e => {
          e.style.backgroundColor = 'transparent'
        })
      }
      else if (!this.newTodo) {
        this.toast(this.$i18n.t('emptyInput'), 2000, this.$i18n.t('close'))
      }
    },
  },

  mixins: [
    toast,
  ],

}
</script>

<style lang="scss" scoped>
#addTodo {
  $btn: $grid12x;

  bottom: 0;
  z-index: 2;
  width: 100%;
  position: fixed;
  padding-bottom: $grid4x;
  @include drop-shadow(0, 0, $grid4x, $black08);

  .addTodo__container {
    padding: $grid4x;

    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid8x}) !important;
    }

    .addTodo__color {
      padding-bottom: $grid4x;

      .addTodo__color-each {
        width: $grid6x;
        height: $grid6x;
        cursor: pointer;
        display: inline-block;
        @include border-radius(100%);

        &:not(:first-child) {
          margin-left: $grid2x;
        }
      }
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
