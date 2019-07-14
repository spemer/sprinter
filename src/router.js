import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: _ => {
        return import('./views/Login.vue')
      },
    },
    {
      path: '/',
      name: 'list',
      component: _ => {
        return import('./views/List.vue')
      },
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('list')
  else next()
})

export default router
