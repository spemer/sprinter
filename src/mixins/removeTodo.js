import { db } from '@/firebase'

export const removeTodo = {
  data: _ => ({
    isRemoved: false,
  }),

  methods: {
    removeTodo(todo, delay) {
      todo.isRemoved = true
      this.isRemoved = true

      this.$toasted.show(`${todo.text} ${this.$i18n.t('removed')}`, {
        theme: 'primary',
        position: 'bottom-center',
        duration: delay,
        action: {
          text: `${this.$i18n.t('undo')}`,
          dontClose: true,
          onClick: (e, toastObject) => {
            todo.isRemoved = false
            this.isRemoved = false
            toastObject.goAway(0)
          }
        },
      })

      setTimeout(() => {
        if (this.isRemoved) {
          db.collection(todo.uid).doc(todo.id).delete()
            .then((response) => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }, delay + 500)
    },
  },
}
