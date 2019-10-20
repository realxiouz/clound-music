import Vue from 'vue'
import Ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Ele, {size: 'mini'})
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
