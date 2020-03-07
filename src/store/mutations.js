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
  // 1.将正在播放的音乐加入到循环播放的数组中
  setPlayingSong(state,payload) {
    // 进行数组插入操作之前，先要保证该数组中没有这个对象才能插入
    var index = state.playingSong.findIndex(item => item.id == payload.song.id) // 如果存在，则返回具体的索引，如果不存在则返回-1
    if(index !== -1) {
      // 如果是包含在数组中的歌曲对象，那么就需要将原来的删除，再新加入一个进去
      state.playingSong.splice(index,1)
      state.songsDetail.splice(index,1)
    }
    // 如果没有包含在数组中则直接加入到数组最前端，如果有则上面删除之后再加入到最前端
    state.playingSong.unshift(payload.song)
    state.songsDetail.unshift(payload.songObj)
  },
  changeSongObj(state,songObj) {
    state.songObj = songObj
  }
}