import Vue from 'vue'

import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import global from './utils/global'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(global)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
