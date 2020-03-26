import {get , post} from './index'
import {home} from './module/home'
import {login} from './module/login'
import {find} from './module/find'
import {daily} from './module/daily'
import {song} from './module/song'
import {playList} from './module/playList'
import {off} from "vant/lib/utils/dom/event";

export const getSwiperList = () => get(home.swiper)

export const postLogin = (params) => get(login.pwdLogin,params)
export const testPhone = (phone) => get(login.testPhone,{phone})
export const sendCode = (phone) => get(login.sendCode,{phone})
export const testCode = (phone,captcha) => get(login.testCode,{phone,captcha})
export const newUserLogin = (captcha,phone,password,nickname) => get(login.newUserLogin, {captcha,phone,password,nickname})
export const initNickName = (nickname) => get(login.initNickName, {nickname})
export const emailLogin = (email,password) => get(login.emailLogin, {email,password})
export const refreshLogin = () => get(login.refresh, {timestamp: new Date().getTime()})

export const swiperList = (type) => get(find.swiper, {type,timestamp: new Date().getTime()})
export const hotSongs6 = () => get(find.hotSongs6, {timestamp: new Date().getTime()})
export const getCatlist = () => get(find.catlist, {timestamp: new Date().getTime()})
export const styleRecom = (cat) => get(find.recom, {cat, limit: 10})
export const sceneRecom = (cat) => get(find.recom, {cat, limit: 10})
export const playDetail = (id) => get(find.playDetail, {id, timestamp: new Date().getTime()})
export const newSong = () => get(find.newSong, {timestamp: new Date().getTime()})
export const newDish = (limit = 6) => get(find.newDish, {limit, timestamp: new Date().getTime()})
export const getTopList = (idx) => get(find.topList, {idx, timestamp: new Date().getTime()})
export const getDjprogram = () => get(find.djprogram, {timestamp: new Date().getTime()})
export const getTopListDet = () => get(find.topListDetail, {timestamp: new Date().getTime()})
export const getSearch = (keywords,limit = 20,offset = 0, type = 1018) => get(find.search, {keywords, limit, offset, type, timestamp: new Date().getTime()})
export const hotSearch = () => get(find.hotSearch, {timestamp: new Date().getTime()})

export const topPlayList = (limit = 33, cat = '全部') => get(playList.topPlayList, {cat, limit, timestamp: new Date().getTime()})
export const getLabels = () => get(playList.labels, {timestamp: new Date().getTime()})
export const getPlayList = (limit = 30, cat = '全部') => get(playList.getPlayList, {cat, limit, timestamp: new Date().getTime()})
export const getPlayListDetail = (id) => get(playList.listdetail, {id, timestamp: new Date().getTime()})

export const dailySongs = () => get(daily.dailySongs,{timestamp: new Date().getTime()})
export const songDetail = (ids) => get(daily.songDetail,{ id: ids.join() , timestamp: new Date().getTime() })

export const getLyric = (id) => get(song.lyric, {id, timestamp: new Date().getTime() })
export const getComment = async (id,limit = 50,offset= 0) => {
  return await get(song.comment, {id, limit, offset: offset*limit, timestamp: new Date().getTime() })
}
export const getHotComment = async (id, limit = 20, offset = 1, type = 0) => {
  return await get(song.hotcomment, {id, limit, offset: offset * limit, type, timestamp: new Date().getTime()})
}
export const setFabulous = (id,cid,t=1,type=0) => get(song.fabulous, {id, cid, t, type, timestamp: new Date().getTime()})
