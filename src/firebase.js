import {
  initializeApp
} from 'firebase'

const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: 'sprinter-web.firebaseapp.com',
  databaseURL: 'https://sprinter-web.firebaseio.com',
  projectId: 'sprinter-web',
  storageBucket: '',
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
})
