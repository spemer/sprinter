import {
  db
} from '@/firebase'

export const removeTodo = {
  methods: {
    data: _ => ({
      isRemoved: false,
    }),

    removeTodo(todo, delay) {
      todo.removed = true
      this.isRemoved = true

      this.$toasted.show(`${todo.text} removed`, {
        theme: 'primary',
        position: 'bottom-center',
        duration: delay,
        action: {
          text: 'UNDO',
          dontClose: true,
          onClick: (e, toastObject) => {
            todo.removed = false
            toastObject.goAway(0)
            this.isRemoved = false
          }
        },
      })

      setTimeout(() => {
        if (this.isRemoved) {
          db.collection(todo.uid).doc(todo.id).delete()
            .then((response) => {
              return console.log(response)
            })
            .catch(error => {
              return console.log(error)
            })
        }
      }, delay)
    },
  },

}
