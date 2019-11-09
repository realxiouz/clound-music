import Vue from 'vue'

Vue.filter('songLength', time => {
  if (time <= 0) {
      return '00:00'
  }
  let t = parseInt(time/1000)
  let m = parseInt(t/60)
  let s = t%60
  return `${m<10?'0'+m:m}:${s<10?'0'+s:s}`
})

Vue.filter('playCount', count => {
  if (count <= 100000) {
      return count
  } else {
    return Math.floor(count / 10000) + '万'
  }
})