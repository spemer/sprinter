import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'sprinter-web.firebaseapp.com',
  databaseURL: 'https://sprinter-web.firebaseio.com',
  projectId: 'sprinter-web',
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()

export const db = firebase.firestore()
export const todosCollection = db.collection('todos')
