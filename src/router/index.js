import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/configuration',
    name: 'config',
    component: () => import( '../views/configuration.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import( '../views/logs.vue')
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: () => import( '../views/accueil.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/visualisation',
    name: 'visualisation',
    component: () => import('../views/visualisation.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
