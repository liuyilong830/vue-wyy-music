import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {mutations} from './mutations'
import {actions} from './actions'
import {getters} from './getters'
import {findView} from './modules/findView'
import {profileView} from './modules/profileView'

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
  songsDetail: [], // 保存多组音乐的详情数据，与上面的 playingSong数组一一对应
  songFlag: {
    move: 1,  // 表示当前播放的模式，1表示列表循环，2表示单曲循环，3表示随机播放
    btnFlag: true,  // 记录当前音乐播放按钮的状态
    currentTime: 0,
    currentLength: 0,
    current: 0
  },
  show: false, // 控制音乐播放器的显示和隐藏
  list: {
    obj: {},
    flag: false
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    findView,
    profileView
  }
})
