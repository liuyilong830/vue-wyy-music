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
  }
}