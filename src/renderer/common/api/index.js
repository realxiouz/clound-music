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
      }
      Message({message: data.msg, type: 'warning'})
      return Promise.reject('code err')
    case 301:
      Message({message: data.msg, type: 'warning'})
      return Promise.reject('need login')
    case 502:
      Message({message: data.msg, type: 'warning'})
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
export const artistSub = params => http.get('/artist/sub', {params}) // 收藏 取消收藏 歌手 {id: 1, t: 1}
export const getArtistSubList = _ => http.get('/artist/sublist')

// album
export const getAlbumSubList = params => http('/album/sublist', {params})

// mv
export const getMvDetail = params => http.get('/mv/detail', {params}) // {mvid: }
export const getMvUrl = params => http.get('/mv/url', {params}) // {id: }
