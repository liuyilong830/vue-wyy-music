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
  password: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
