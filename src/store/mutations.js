import router from '../router'
import { CHANGE_LOADING_STATE, GO_PAGE, UPDATE_DIRECTION } from './mutation-types'

const mutations = {
  [GO_PAGE] (state, payload) {
    router.push(payload)
  },
  [UPDATE_DIRECTION] (state, payload) {
    state.direction = payload.direction
  },
  [CHANGE_LOADING_STATE] (state, payload) {
    state.loadingParam = { ...state.loadingParam, ...payload }
  }
}
export default mutations