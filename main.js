import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import api from './common/api.js'
import config from './config.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$config = config

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

const app = new Vue({
    ...App,
	store
})
app.$mount()
