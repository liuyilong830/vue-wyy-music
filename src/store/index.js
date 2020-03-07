import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {mutations} from './mutations'
import {actions} from './actions'
import {getters} from './getters'

const state = {
  token: window.localStorage.getItem('token-wyy') || '',
  account: JSON.parse(window.localStorage.getItem('account-wyy')) || {},
  profile: JSON.parse(window.localStorage.getItem('profile-wyy')) || {},
  loginType: window.localStorage.getItem('loginType'),
  bindings: JSON.parse(window.localStorage.getItem('bindings')) || [],
  phone: '',
  password: '',
  playingSong: [], // 用来存放多组音乐，每点击一首歌，就将其加入到等待播放的数组中，按顺序执行
  songObj: {}, // 保存当前播放歌曲的详情和之前播放歌曲的详情数组，包含播放的url
  songsDetail: [] // 保存多组音乐的详情数据，与上面的 playingSong数组一一对应
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
