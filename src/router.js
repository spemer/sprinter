import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: _ => {
        return import('./views/Home.vue')
      },
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: _ => {
        return import('./views/Login.vue')
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
})

function requireAuth(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    return (!user) ?
      next('/login') :
      next()
  })
}

export default router
