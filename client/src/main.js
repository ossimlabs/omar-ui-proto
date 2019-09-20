import Vue from 'vue'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line no-unused-vars
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify({
    theme: { dark: true }
  }),
  store,
  render: h => h(App)
}).$mount('#app')
