import axios from 'axios'

const testUrl = 'http://47.114.167.61/apz'
const localUrl = 'http://localhost:3000'

const instance = axios.create({
  baseURL: testUrl,
  timeout: 10000,
  withCredentials: true
})
// 请求拦截器
instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token-wyy')
  return config
},err => {
  console.log(err)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  if(response.data.code === 200) {
    return response.data
  }
},err => {
  return Promise.reject(err)
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
