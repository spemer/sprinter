import {
  todosCollection
} from '@/firebase'
import {
  toast
} from '@/mixins/toast'

export const removeItem = {
  methods: {
    removeItem(todo) {
      todosCollection.doc(todo.id).delete()
        .then(() => {
          this.toast(`${todo.text} Removed`)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  mixins: [
    toast,
  ],
}
