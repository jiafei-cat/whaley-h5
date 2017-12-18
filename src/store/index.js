import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false,
  direction: 'forward',
  debug: true
}

const getters = {
  'getLoadding': (state) => {
    return state.loading
  }
}

const CHANGE_LOADING_STATE = 'changeLoadingState'
const mutations = {
  [CHANGE_LOADING_STATE] (state, payload) {
    state.loading = payload
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store