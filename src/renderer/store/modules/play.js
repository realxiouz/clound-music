
import { getSongUrl } from '@/common/api'

const state = {
  listAudio: [],
  indexAudio: 0,
  currentAudio: {
    al: {},
    dt: 0,
  },
  playTime: 0, //单位 ms
  audioPlaying: false,
  videoPlaying: false,
}

const mutations = {
  setListAudio(s, l) {
    s.listAudio = l
  },
  setCurrentAudio(s, o) {
    s.currentAudio = o
  },
  setAudioPlaying(s, b) {
    s.audioPlaying = b
  },
  setIndexAudio(s, i) {
    s.indexAudio = i
  },
  setPlayTime(s, t) {
    s.playTime = t
  }
}

const getters = {
  
}

const actions = {
  playAudio({commit, state}) {
    if(!state.listAudio.length) {
      return
    }
    if (state.listAudio[state.indexAudio].url) {
      commit('setCurrentAudio', state.listAudio[state.indexAudio])
    } else {
      let {id} = state.listAudio[state.indexAudio]
      getSongUrl({id}).then(r => {
        if (r.data.length) {
          let url = r.data[0].url
          commit('setCurrentAudio', {...state.listAudio[state.indexAudio], url})
          state.listAudio[state.indexAudio].url = url
          // commit('setListAudio', state.listAudio.splice(state.indexAudio, 1, {...state.listAudio[state.indexAudio], url}))
        }
      })
    }
  },
  playNextAudio({dispatch, state, commit}) {
    if (state.indexAudio === state.listAudio.length -1 ) {
      return
    }
    commit('setIndexAudio', state.indexAudio + 1)
    dispatch('playAudio')
  },
  playPreAudio({dispatch, state, commit}) {
    if (state.indexAudio === 0) {
      return
    }
    commit('setIndexAudio', state.indexAudio - 1)
    dispatch('playAudio')
  },
  playSongSheet({commit, dispatch}, list) {
    commit('setIndexAudio', 0)
    commit('setListAudio', list)
    dispatch('playAudio')
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}