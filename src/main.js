// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import router from './router'

import store from './store'

import moment from 'moment'

moment.locale('zh-cn');
//console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
Vue.prototype.moment = moment;
//import VueSocketio from 'vue-socket.io'
//import socketio from 'socket.io-client'
//Vue.use(VueSocketio, socketio('http://localhost:60056'),store);

Vue.config.productionTip = false


import './assets/scss/index.scss'

import '../static/font/iconfont.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
//VueSocketio,
//template: '<App/>',
	render:h=>h('router-view')
//components: { App }
})
