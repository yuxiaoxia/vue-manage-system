import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
require('es6-promise').polyfill();

import axios from './js/http'
import './js/filters.js'

Vue.use(ElementUI);
Vue.prototype.$axios = axios;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');