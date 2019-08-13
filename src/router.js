import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    // router
    {
      path: '/',
      name: 'home',
      component: () => {
        return import(/* webpackChunkName: 'router - views/Home' */ './views/Home.vue')
      },
      beforeEnter: requireAuth,
    },
    {
      path: '/login/',
      name: 'login',
      component: () => {
        return import(/* webpackChunkName: 'router - views/Login' */ './views/Login.vue')
      },
    },
    {
      path: '/opensource/',
      name: 'opensource',
      component: () => {
        return import(/* webpackChunkName: 'router - views/Opensource' */ './views/Opensource.vue')
      },
      beforeEnter: requireAuth,
    },
    {
      path: '/privacy-policy/',
      name: 'privacy',
      component: () => {
        return import(/* webpackChunkName: 'router - views/Privacy' */ './views/Privacy.vue')
      },
    },
    {
      path: '/delete-account/',
      name: 'deleteAccount',
      component: () => {
        return import(/* webpackChunkName: 'router - views/DeleteAccount' */ './views/DeleteAccount.vue')
      },
    },

    // redirect
    {
      path: '*',
      redirect: '/',
    },
  ],

  // scrollBehavior
  scrollBehavior: (to, from, savedPosition) => {
    return (savedPosition) ? savedPosition : {
      x: 0,
      y: 0,
    }
  },
})

// firebase requireAuth
function requireAuth(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    return (!user) ?
      next('/login') :
      next()
  })
}

export default router
