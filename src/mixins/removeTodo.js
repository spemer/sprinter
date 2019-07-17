import {
  db
} from '@/firebase'
import {
  toast
} from '@/mixins/toast'

export const removeTodo = {
  methods: {
    removeTodo(todo) {
      setTimeout(() => {
        db.collection(todo.uid).doc(todo.id).delete()
          .then(() => {
            this.toast(`Todo removed`)
          })
          .catch(error => {
            console.log(error)
          })
      }, 0)
    },
  },

  mixins: [
    toast,
  ],
}
