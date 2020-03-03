import {get , post} from './index'
import {home} from './module/home'
import {login} from './module/login'

export const getSwiperList = () => get(home.swiper)
export const postLogin = (params) => get(login.pwdLogin,params)
export const testPhone = (phone) => get(login.testPhone,{phone})
export const sendCode = (phone) => get(login.sendCode,{phone})
