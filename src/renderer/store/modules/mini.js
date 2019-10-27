const state = {
  mainId: 0,
  miniId: 0,
}

const mutations = {
  setMainId(s, i) {
    s.mainId = i
  },
  setMiniId(s, i) {
    s.miniId = i
  }
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
