import {get , post} from './index'
import {home} from './module/home'
import {login} from './module/login'
import {find} from './module/find'
import {daily} from './module/daily'
import {song} from './module/song'

export const getSwiperList = () => get(home.swiper)

export const postLogin = (params) => get(login.pwdLogin,params)
export const testPhone = (phone) => get(login.testPhone,{phone})
export const sendCode = (phone) => get(login.sendCode,{phone})
export const testCode = (phone,captcha) => get(login.testCode,{phone,captcha})
export const newUserLogin = (captcha,phone,password,nickname) => get(login.newUserLogin, {captcha,phone,password,nickname})
export const initNickName = (nickname) => get(login.initNickName, {nickname})
export const emailLogin = (email,password) => get(login.emailLogin, {email,password})

export const swiperList = (type) => get(find.swiper, {type,timestamp: new Date().getTime()})
export const hotSongs6 = () => get(find.hotSongs6, {timestamp: new Date().getTime()})
export const styleRecom = (cat) => get(find.styleRecom, {cat, limit: 10})
export const playDetail = (id) => get(find.playDetail, {id, timestamp: new Date().getTime()})

export const dailySongs = () => get(daily.dailySongs,{timestamp: new Date().getTime()})
export const songDetail = (ids) => get(daily.songDetail,{ id: ids.join() , timestamp: new Date().getTime() })

export const getLyric = (id) => get(song.lyric, {id, timestamp: new Date().getTime() })
