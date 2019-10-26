const state = {
  user: {},
  showLoginForm: false,
}

const mutations = {
  setUser(s, u) {
    s.user = u
  },
  setShowLoginForm(s, b) {
    s.showLoginForm = b
  },
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
