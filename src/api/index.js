import axios from 'axios'
import store from 'store/index.js'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
})
// 请求拦截器
instance.interceptors.request.use(config => {
  return config
},err => {
  console.log(err)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  if(response.data.code === 200) {
    store.commit('setToken',response.data.token)
    return response.data
  }
},err => {
  console.log(err)
})
// 封装get请求
export function get(url,params) {
  return new Promise((resolve,reject) => {
    instance({
      url,
      params
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}
// 封装post请求
export function post(url,data) {
  return new Promise((resolve,reject) => {
    instance({
      method: 'POST',
      url,
      data
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}
