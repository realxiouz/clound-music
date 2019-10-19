import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:3000'
})

http.interceptors.response.use(res => {
  return res.data
}, err => {
  Promise.reject(err)
})

export const getBanners = _ => http.get('/banner')