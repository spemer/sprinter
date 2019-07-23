/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
      caches.keys().then((names) => {
        for (let name of names)
          return caches.delete(name)
      })
    },
    updated() {
      console.log('New content is available please refresh.')
      displayUpdateNotification()
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

// show update notification
function displayUpdateNotification() {

  const link = document.createElement('span')
  link.classList.add('update-notification')
  link.innerHTML = 'Update is available. Click here to install.'

  link.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload(true)
  })

  document.querySelector('body').appendChild(link)
}
