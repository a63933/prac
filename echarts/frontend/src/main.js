import Vue from 'vue'
import App from './App'
import echarts from 'echarts'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
