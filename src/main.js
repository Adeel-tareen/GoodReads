import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue, IconsPlugin)
new Vue({
  vuetify,
  render:h => h(App)
}).$mount('#app')
