import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueLodash from 'vue-lodash'

const options = { name: 'lodash' }

Vue.use(VueResource)
Vue.use(VueLodash, options)

new Vue({
  el: 'body',
  components: {
    App
  }
})