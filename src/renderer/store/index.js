import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'
import auth from './modules/auth'
import play from './modules/play'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    play,
  },
  strict: process.env.NODE_ENV !== 'production'
})
