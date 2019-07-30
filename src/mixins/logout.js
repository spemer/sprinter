import {
  toast
} from '@/mixins/toast'

export const logout = {
  methods: {
    logout() {
      this.$Progress.start()
      this.toast(`${this.$t('logout')}`, 2000, this.$t('close'))
      this.$store.dispatch('signOutAction')
        .then(() => {
          if (this.$store.getters.getUser === null) {
            this.$router.replace('/login')
            this.$Progress.finish()
          }
        })
    }
  },

  mixins: [
    toast,
  ],

}
