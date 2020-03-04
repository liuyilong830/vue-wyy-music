import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login.vue')
const Find = () => import('views/find/Find.vue')
const Profile = () => import('views/profile/Profile.vue')
const Cloud  = () => import('views/cloud/Cloud.vue')
const Video = () => import('views/video/Video.vue')

const routes = [
  { path: '/' , redirect: '/login'},
  { path: '/login' , component: Login },
  { path: '/find' , component: Find , meta:{showTabBar:true} },
  { path: '/profile' , component: Profile , meta:{showTabBar:true} },
  { path: '/cloud' , component: Cloud , meta:{showTabBar:true} },
  { path: '/video' , component: Video , meta:{showTabBar:true} }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
