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


export const getBanners = _ => http.get('/banner')
// 根据歌单
export const getSongSheet = params => http.get('/personalized', {params})

// 获取每日推荐
export const getRecommend = _ => http.get('/recommend/resource')
// 根据id获取歌单详情
export const getSongSheetDetail = params => http.get('/playlist/detail', {params})

export const getSongUrl = params => http.get('/song/url', {params})
export const getSongLyric = params => http.get('/lyric', {params})

// artist
export const getArtistList = params => http.get('/artist/list', {params})
export const getArtistAlbum = params => http.get('/artist/album', {params})
export const getArtistDesc = params => http.get('/artist/desc', {params})
export const getArtistSong = params => http.get('/artists', {params})
export const getArtistMv = params => http.get('/artist/mv', {params})
export const getArtistSimilar = params => http.get('/simi/artist', {params})

