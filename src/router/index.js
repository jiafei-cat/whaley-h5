import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '../store'
import { UPDATE_DIRECTION, CHANGE_LOADING_STATE } from '../store/mutation-types'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  // set router direction
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit(UPDATE_DIRECTION, {direction: 'forward'})
    } else {
      store.commit(UPDATE_DIRECTION, {direction: 'reverse'})
    }
    // init page loading state
    if (to.meta && to.meta.keepAlive) {
      store.commit(CHANGE_LOADING_STATE, {state: 1})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit(UPDATE_DIRECTION, {direction: 'forward'})
  }
  // set page title
  to.meta.title ? (document.title = to.meta.title) : ''
  next()
})

export default router