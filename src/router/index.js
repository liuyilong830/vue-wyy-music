import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login.vue')
const Find = () => import('views/find/Find.vue')

const routes = [
  { path: '/' , redirect: '/login'},
  { path: '/login' , component: Login },
  { path: '/find' , component: Find }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
