/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      return console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      return console.log('Service worker has been registered.')
    },
    cached() {
      return console.log('Content has been cached for offline use.')
    },
    updatefound() {
      return console.log('New content is downloading.')
    },
    updated() {
      return console.log('New content is available; please refresh.')
    },
    offline() {
      return console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      return console.error('Error during service worker registration:', error)
    }
  })
}
