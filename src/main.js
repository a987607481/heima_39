import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

import '@/styles/reset.less'

// 引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
