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
  },
  getCurrentIndex(state) {
    return state.playingSong.findIndex(item => item.id == state.songObj.id)
  },
  getSongFlag(state) {
    return state.songFlag
  },
  getShowMusicPlayer(state) {
    return state.show
  },
  getList(state) {
    return state.list
  },
  /**
   * 将场景推荐点击查看更多的index值传给playlist组件，改变其currentIndex属性值
   */
  getChangeIndex(state) {
    return state.playlistIndex
  },
  getPlayerFlag(state) {
    return state.close
  }
}