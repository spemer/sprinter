import { db, auth } from '@/firebase'

export const addTodo = {
  data: _ => ({
    newTodo: '',
    todos: [],
    selectedColor: 'transparent',
    selectedArray: [],
  }),

  firestore: _ => {
    return {
      todos: db.collection(auth.currentUser.uid).orderBy('createdAt', 'desc')
    }
  },

  methods: {
    clearForm() {
      this.newTodo = ''
    },

    setColor(i) {
      let el = this.$refs.addColorEach

      for (let j = 0; j < el.length; j++) {
        if (i === j) {
          let getBgColor = getComputedStyle(el[i]).backgroundColor

          if (getBgColor == 'rgba(0, 0, 0, 0)') {
            el[i].style.backgroundColor = this.getColors[i][0]
            this.selectedColor = this.getColors[i][0]
            this.getColors[i][1] = this.getColors[i][0]
          } else {
            el[i].style.backgroundColor = 'transparent'
            this.selectedColor = 'transparent'
            this.getColors[i][1] = 'transparent'
          }
        } else {
          el[j].style.backgroundColor = 'transparent'
        }
      }
    },

    addTodo() {
      if (this.newTodo) {
        db.collection(auth.currentUser.uid).add({
            text: this.newTodo,
            isCompleted: false,
            isRemoved: false,
            isSelected: true,
            color: this.selectedColor,
            id: this.todos.length,
            uid: this.getUser,
            createdAt: new Date(),
          })
          .then(docRef => {
            console.log(`ID: ${docRef.id}`)
            this.$scrollTo({
              el: 'body',
              duration: 0,
            })
          })
          .catch(error => {
            console.error(error)
          })

        this.newTodo = ''
        this.selectedColor = 'transparent'

        let el = this.$refs.addColorEach;
        [...el].forEach((e) => {
          e.style.backgroundColor = 'transparent'
        })
      } else if (!this.newTodo) {
        this.toast(this.$i18n.t('emptyInput'), 2000, this.$i18n.t('close'))
      }
    },
  },
}
