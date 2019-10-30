
import { getSongUrl, likeSong } from '@/common/api'
import { Message } from 'element-ui'

const state = {
  likeList: [],
  playMode: 1, //1->顺序 2->列表循环 3->单曲循环 4->随机
  lyricLines: [],
  currentLine: 0,
  listAudio: [],
  indexAudio: 0,
  currentAudio: {
    al: {},
    dt: 0,
    ar: [
      {}
    ],
  },
  playTime: 0, //单位 ms
  audioPlaying: false,
  videoPlaying: false,
}

const mutations = {
  setLikeList(s, a) {
    s.likeList = a
  },
  setPlayMode(s, n) {
    s.playMode = n
  },
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
  },
  setLyricLines(s, l) {
    s.lyricLines = l
  },
  setCurrentLine(s, l) {
    s.currentLine = l
  }
}

const getters = {
  
}

const actions = {
  playAudio({commit, state, dispatch}) {
    if(!state.listAudio.length) {
      return
    }

    if (state.likeList.findIndex(i => i === state.listAudio[state.indexAudio].id) > -1) {
      state.listAudio[state.indexAudio].like = true
    }

    if (state.listAudio[state.indexAudio].url) {
      commit('setCurrentAudio', state.listAudio[state.indexAudio])
      commit('setAudioPlaying', true)
    } else {
      let {id} = state.listAudio[state.indexAudio]
      getSongUrl({id}).then(r => {
        if (r.data.length) {
          let url = r.data[0].url
          if (url) {
            commit('setCurrentAudio', {...state.listAudio[state.indexAudio], url})
            commit('setAudioPlaying', true)
            state.listAudio[state.indexAudio].url = url
          } else {
            console.log(`获取url失败,id: ${id}`)
            // todo
            dispatch('playNextAudio')
          }
        }
      })
    }
  },
  playNextAudio({dispatch, state, commit}) {
    let inx
    switch(state.playMode) {
      case 1:
        inx = state.indexAudio + 1
        break
      case 2:
        inx = state.indexAudio + 1 === state.listAudio.length ? 0 : state.indexAudio + 1
        break
      case 3:
        inx = state.indexAudio
        break
      case 4:
        inx = Math.floor(Math.random()*state.listAudio.length)
        break
    }
    if (inx === state.listAudio.length) {
      // 全部播放完毕
      console.log('全部播放完毕')
      // Message({message: '全部播放完毕', type: 'warning'})
      let notification = new Notification('标题', {
        body: '全部播放完毕'
      })
      commit('setAudioPlaying', false)
      return
    }
    commit('setIndexAudio', inx)
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
    commit('setListAudio', list)
    commit('setIndexAudio', 0)
    dispatch('playAudio')
  },
  playFromIndex({commit, dispatch}, inx) {
    commit('setIndexAudio', inx)
    dispatch('playAudio')
  },
  toggleLike({commit, state}) {
    let id = state.currentAudio.id
    let isLike = state.likeList.findIndex(i => i === id) > -1
    let data = {
      id,
      like: !isLike
    }
    likeSong(data).then(r => {
      commit('setCurrentAudio', {...state.currentAudio, like: !isLike})
      if (!isLike) {
        commit('setLikeList', state.likeList.filter(i => i !== id))
        return
      }
      commit('setLikeList', [...state.likeList, id])
    })
  },
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}