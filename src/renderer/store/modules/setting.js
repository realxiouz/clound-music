const state = {
  order: ['推荐歌单', '推荐MV', '独家放送', '主播电台']
}

const mutations = {
  setOrder(s, o) {
    s.order = o
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}