import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import store from '@/store'

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
      meta: {
        requiresAuth: true,
      },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getUser) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
