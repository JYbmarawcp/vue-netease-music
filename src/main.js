import Vue from 'vue'

import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import global from './utils/global'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
