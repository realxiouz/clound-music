import { Message } from 'element-ui'

import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

http.interceptors.response.use(res => {
  let {status, data} = res
  switch(status) {
    case 200:
      if (data.code === 200) {
        return data
      } else {
        Message({message: data.message, type: 'warning'})
        return Promise.reject('code err')
      }
    case 502:
      Message({message: data.message, type: 'warning'})
      return Promise.reject('密码错误')
  }
}, err => {
  return Promise.reject(err.message)
})

export const loginByPhone = params => http.get('/login/cellphone', {params})

// 发现音乐
export const getBanners = _ => http.get('/banner')
export const getSongSheet = params => http.get('/personalized', {params})
export const getSongSheetDetail = params => http.get('/playlist/detail', {params})

export const getSongUrl = params => http.get('/song/url', {params})
export const getSongLyric = params => http.get('/lyric', {params})