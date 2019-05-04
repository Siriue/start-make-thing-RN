import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios';
import axios from 'axios';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;
dayjs.locale('zh-cn');

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
