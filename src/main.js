import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false



new Vue({
  router,
  VueCookies,
  render: h => h(App),
}).$mount('#app')
