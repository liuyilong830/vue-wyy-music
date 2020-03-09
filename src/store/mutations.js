import {deepCopy} from '@/utils/utils.js'

export const mutations = {
  setAccount(state,account) {
    window.localStorage.setItem('account-wyy',JSON.stringify(account))
    state.account = account
  },
  setProfile(state,profile) {
    window.localStorage.setItem('profile-wyy',JSON.stringify(profile))
    state.profile = profile
  },
  setLoginType(state,loginType) {
    window.localStorage.setItem('loginType',loginType)
    state.loginType = loginType
  },
  setBindings(state,bindings) {
    window.localStorage.setItem('bindings',JSON.stringify(bindings))
    state.bindings = bindings
  },
  setToken(state,token) {
    window.localStorage.setItem('token-wyy',token)
    state.token = token
  },
  setPhone(state,phone) {
    state.phone = phone
  },
  setPassword(state,pwd) {
    state.password = pwd
  },
  // 下面是跟外部播放器有关的操作
  // 将整个列表中的歌都加入到待播放的歌曲列表
  setSongList(state,payload) {
    state.playingSong = deepCopy(payload.songs)
    state.songsDetail = deepCopy(payload.songsDetail)
  },
  // 将正在播放的音乐加入到循环播放的数组中
  setPlayingSong(state,payload) {
    // 进行数组插入操作之前，先要保证该数组中没有这个对象才能插入
    var index = state.playingSong.findIndex(item => item.id == payload.song.id) // 如果存在，则返回具体的索引，如果不存在则返回-1
    if(index !== -1) {
      return
    }
    // 如果没有包含在数组中则直接加入到数组最前端，如果有则上面删除之后再加入到最前端
    state.playingSong.unshift(payload.song)
    state.songsDetail.unshift(payload.songObj)
  },
  changeSongObj(state,songObj) {
    state.songObj = songObj
  },
  /* changeMove(state,move) {
    state.move = move
  },
  setBtnFlag(state,flag) {
    state.btnFlag = flag
  },
  setCurrentLength(state,length) {
    state.currentLength = length
  },
  setCurrentTime(state,time) {
    state.currentTime = time
  }, */
  setSongFlag(state,payload) {
    state.songFlag = Object.assign(state.songFlag, payload)
  }
}
