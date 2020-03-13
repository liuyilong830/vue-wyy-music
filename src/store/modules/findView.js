import {styleRecom,playDetail} from 'api/api.js'

const state = {
  playlist: {},
  songDetail: []
}

const mutations = {
  setStyleRecom(state, result) {
    state.playlist = result
    if(state.songDetail.length == 12) return 
    for(var i = 0; i < 12; i++) {
      state.songDetail.push(result.tracks[i])
    }
  }
}

const actions = {
  // 获取风格推荐歌单，cat为歌单的类型
  async styleRecom({ commit,dispatch }, cat) {
    var result = await styleRecom(cat)
    // 获取歌单中的第一个歌单中的歌单id，传入另一个方法，获取到歌单中歌曲的相关信息
    result = await dispatch('playDetail',result.playlists[0].id)
    // 将相关信息保存在 playlist 对象中
    commit('setStyleRecom', result.playlist)
  },
  async playDetail(context , id) {
    return await playDetail(id)
  }
}

const getters = {
  
}

export const findView = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}