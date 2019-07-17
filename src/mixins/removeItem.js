import {
  db
} from '@/firebase'
import {
  toast
} from '@/mixins/toast'

export const removeItem = {
  methods: {
    removeItem(todo) {
      setTimeout(() => {
        db.collection(todo.uid).doc(todo.id).delete()
          .then(() => {
            this.toast(`${todo.text} Removed`)
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
