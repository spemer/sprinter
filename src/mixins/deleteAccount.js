// import firebase from 'firebase/app'
import { auth } from '@/firebase'
import { toast } from '@/mixins/toast'

export const deleteAccount = {
  methods: {
    deleteAccount () {
      this.toast(`${this.$t('waitDeleteAccount')}`, 2000, this.$t('close'))

      // let providerId = auth.currentUser.providerData[0].providerId
      // let provider
      // let token = auth.currentUser.getIdToken(true)

      // if (providerId === 'facebook.com') {
      //   provider = firebase.auth.FacebookAuthProvider.credential(providerId)
      // }
      // else if (providerId === 'google.com') {
      //   provider = firebase.auth.GoogleAuthProvider.credential(providerId)
      // }
      // else if (providerId === 'twitter.com') {
      //   provider = firebase.auth.TwitterAuthProvider.credential(providerId)
      // }

      // console.log('provider: ', provider)
      // console.log('providerId: ', providerId)
      // console.log('signInMethod: ', provider.signInMethod)
      // console.log('token: ', token)

      // let credential = firebase.auth.AuthCredential

      // console.log(credential)

      // auth.currentUser.reauthenticateWithCredential(credential)
      // .then(() => {
        auth.currentUser.delete()
        .then(() => {
          this.$router.replace('/login')
        })
        .catch((error) => {
          this.toast(`${this.$t('loginAgain')}`, 2000, this.$t('close'))
          console.log(error)
        })
      // }).catch((error) => {
      //   this.toast(`${this.$t('loginAgain')}`, 2000, this.$t('close'))
      //   console.log(error)
      // })
    }
  },

  mixins: [
    toast,
  ],
}
