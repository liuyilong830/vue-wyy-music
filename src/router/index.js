import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login.vue')
const Find = () => import('views/find/Find.vue')
const Profile = () => import('views/profile/Profile.vue')
const Cloud  = () => import('views/cloud/Cloud.vue')
const Video = () => import('views/video/Video.vue')
const DailyRecommend = () => import('views/Daily/DailyRecommend')
const MusicPlayer = () => import('views/music-player/MusicPlayer')
const PlayList = () => import('views/play-list/PlayList')

const routes = [
  { path: '/' , redirect: '/login'},
  { path: '/login' , component: Login },
  { path: '/find' , component: Find , meta:{showTabBar:true, showPlayer:true} },
  { path: '/playlist' , component: PlayList , meta:{showTabBar: false, showPlayer: true} },
  { path: '/profile' , component: Profile , meta:{showTabBar:true, showPlayer:true} },
  { path: '/cloud' , component: Cloud , meta:{showTabBar:true, showPlayer:true} },
  { path: '/video' , component: Video , meta:{showTabBar:true, showPlayer:true} },
  { path: '/dailyRem' , component: DailyRecommend , meta:{showTabBar: false, showPlayer:true} },
  { path: '/music' , component: MusicPlayer }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') {
    window.localStorage.setItem('path', from.path)
  }else if(from.path === '/login' && to.path == '/find') {
    let path = window.localStorage.getItem('path')
    if(path !== '/') {
      return next(path)
    }
  }
  next()
})

export default router
