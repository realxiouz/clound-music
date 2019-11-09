import Vue from 'vue'
import Ele from 'element-ui'
import '@/common/css/chin.scss'
import '@/common/css/element-var.scss'
Vue.use(Ele, {size: 'mini'})

import App from './App'

import router from './router'
import store from './store'

import './fliter'
import './directive'
import './icons'

import Local from '@/common/local'
Vue.prototype.$local = Local

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App />'
}).$mount('#app')
