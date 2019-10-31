import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'
import auth from './modules/auth'
import play from './modules/play'
import artist from './modules/artist'
import mini from './modules/mini'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    play,
    artist,
    mini,
    setting,
  },
  strict: process.env.NODE_ENV !== 'production'
})
