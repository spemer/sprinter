import firebase from 'firebase/app'
import {
  auth
} from '@/firebase'

import {
  toast
} from '@/mixins/toast'

export const fbLogin = {
  methods: {
    fbLogin() {
      this.$Progress.start()
      let facebookProvider = new firebase.auth.FacebookAuthProvider()

      this.$store.dispatch('signInAction', facebookProvider)
        .then(() => {
          this.$Progress.finish()
          if (this.getUser) {
            this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
          }
        })
    }
  },

  mixins: [
    toast,
  ],
}

export const googleLogin = {
  methods: {
    googleLogin() {
      this.$Progress.start()
      let googleProvider = new firebase.auth.GoogleAuthProvider()

      this.$store.dispatch('signInAction', googleProvider)
        .then(() => {
          this.$Progress.finish()
          if (this.getUser) {
            this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
          }
        })
    }
  },

  mixins: [
    toast,
  ],
}

export const twitterLogin = {
  methods: {
    twitterLogin() {
      this.$Progress.start()
      let twitterProvider = new firebase.auth.TwitterAuthProvider()

      this.$store.dispatch('signInAction', twitterProvider)
        .then(() => {
          this.$Progress.finish()
          if (this.getUser) {
            this.toast(`${this.$i18n.t('welcome')}, ${auth.currentUser.displayName}!`, 2000, this.$i18n.t('close'))
          }
        })
    }
  },

  mixins: [
    toast,
  ],
}
