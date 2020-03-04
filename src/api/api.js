import {get , post} from './index'
import {home} from './module/home'
import {login} from './module/login'
import {find} from './module/find'

export const getSwiperList = () => get(home.swiper)
export const postLogin = (params) => get(login.pwdLogin,params)
export const testPhone = (phone) => get(login.testPhone,{phone})
export const sendCode = (phone) => get(login.sendCode,{phone})
export const testCode = (phone,captcha) => get(login.testCode,{phone,captcha})
export const swiperList = (type) => get(find.swiper, {type,timestamp: new Date().getTime()})
