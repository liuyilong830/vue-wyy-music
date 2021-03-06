import {get , post} from './index'
import {home} from './module/home'
import {login} from './module/login'
import {find} from './module/find'
import {daily} from './module/daily'
import {song} from './module/song'
import {playList} from './module/playList'
import {search} from './module/search'

export const getSwiperList = () => get(home.swiper)

export const postLogin = (params) => post(login.pwdLogin,params)
export const testPhone = (phone) => get(login.testPhone,{phone})
export const sendCode = (phone) => get(login.sendCode,{phone})
export const testCode = (phone,captcha) => get(login.testCode,{phone,captcha})
export const newUserLogin = (captcha,phone,password,nickname) => get(login.newUserLogin, {captcha,phone,password,nickname})
export const initNickName = (nickname) => get(login.initNickName, {nickname})
export const emailLogin = (email,password) => post(login.emailLogin, {email,password})
export const refreshLogin = () => get(login.refresh)

export const swiperList = (type) => get(find.swiper, {type})
export const hotSongs6 = () => get(find.hotSongs6)
export const getCatlist = () => get(find.catlist)
export const styleRecom = (cat) => get(find.recom, {cat, limit: 10})
export const sceneRecom = (cat) => get(find.recom, {cat, limit: 10})
export const playDetail = (id) => get(find.playDetail, {id})
export const newSong = () => get(find.newSong)
export const newDish = (limit = 6) => get(find.newDish, {limit})
export const getTopList = (idx) => get(find.topList, {idx})
export const getDjprogram = () => get(find.djprogram)
export const getTopListDet = () => get(find.topListDetail)

export const topPlayList = (limit = 33, cat = '全部') => get(playList.topPlayList, {cat, limit})
export const getLabels = () => get(playList.labels, {timestamp: new Date().getTime()})
export const getPlayList = (limit = 30, cat = '全部') => get(playList.getPlayList, {cat, limit})
export const getPlayListDetail = (id) => get(playList.listdetail, {id})

export const dailySongs = () => get(daily.dailySongs)
export const songDetail = (ids) => get(daily.songDetail,{ id: ids.join() })

export const getLyric = (id) => get(song.lyric, {id})
export const getComment = async (id,limit = 50,offset= 0) => {
  return await get(song.comment, {id, limit, offset: offset*limit })
}
export const getHotComment = async (id, limit = 20, offset = 1, type = 0) => {
  return await get(song.hotcomment, {id, limit, offset: offset * limit, type})
}
export const setFabulous = (id,cid,t=1,type=0) => get(song.fabulous, {id, cid, t, type})

export const getSearch = (keywords,limit = 20,offset = 0, type = 1018) => get(search.search, {keywords, limit, offset, type})
export const hotSearch = () => get(search.hotSearch)
export const defSearch = () => get(search.defSearch)
export const getSuggest = (keywords, type = 'mobile') => get(search.suggest, {keywords, type})
