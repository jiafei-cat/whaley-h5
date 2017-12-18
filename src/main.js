import Vue from 'vue'
import App from './App.vue'
import VuexRouterSync from 'vuex-router-sync' // 将router的参数放入vuex
import router from './router'
import store from './store'
import FastClick from 'fastclick'

VuexRouterSync.sync(store, router)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<app/>'
// })
new Vue({
  router,
  store
}).$mount('#app')