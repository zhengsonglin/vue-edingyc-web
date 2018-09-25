import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import Vuex from 'vuex'
import axios from 'axios'
import '@/libs/rem'
import store from './store/'
import { XButton ,Box, ToastPlugin, LoadingPlugin, AlertPlugin, AjaxPlugin } from 'vux'
import Util from './libs/util'
//import 'vue-awesome/icons'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios	//为了方便使用我们将axios
//挂到vue.prototype.$http这个原型上，定义之后在其他组件里面就可以直接使用$http
Vue.prototype.util = Util

const FastClick = require('fastclick')
FastClick.attach(document.body)

import VCharts from 'v-charts'
Vue.use(VCharts)

/*引入移动端手势库*/
import directives from './directives/touch'
directives(Vue);

Vue.use(Vuex);
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
//Vue.use(AjaxPlugin)		//引用后可直接使用this.$http, 等同于上面的Vue.prototype.$http = axios 

Vue.component('x-button', XButton)
Vue.component('box', Box)

/*只有开发环境才引入mockjs*/
process.env.MOCK && require("./mock/mock.js") 

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
