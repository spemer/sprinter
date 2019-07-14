import {
  initializeApp
} from 'firebase'

const app = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'sprinter-web.firebaseapp.com',
  databaseURL: 'https://sprinter-web.firebaseio.com',
  projectId: 'sprinter-web',
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
})

export const db = app.firestore()
export const todosCollection = db.collection('todos')
