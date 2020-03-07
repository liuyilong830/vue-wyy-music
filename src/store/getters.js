export const getters = {
  getType(state) {
    return state.loginType
  },
  getPhone(state) {
    return state.phone
  },
  getPassword(state) {
    return state.password
  },
  getAccount(state) {
    return state.account
  },
  getPlayingSong(state) {
    return state.playingSong
  },
  getSongObj(state) {
    return state.songObj
  },
  getSongsDetail(state) {
    return state.songsDetail
  },
  getShowSong(state) {
    return state.playingSong.filter(item => item.id == state.songObj.id)
  }
}