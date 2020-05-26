import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 图片懒加载
import { Lazyload } from 'vant';
import { Popup } from 'vant';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Icon } from 'vant';
import { Button } from 'vant';
import { Rate } from 'vant';
import { Swipe, SwipeItem } from 'vant';


// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Rate)
Vue.use(Swipe).use(SwipeItem);

Vue.use(MintUI)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;



Vue.prototype.dealImg=(img) =>{
  return img.replace(/http\w{0,1}:\/\//, 'https://images.weserv.nl/?url=')
}
Vue.prototype.dealCImg=(img) =>{
  return img.replace(/<img src="http\w{0,1}:\/\//g, '<img style="width:100%;" src="https://images.weserv.nl/?url=')
}
Vue.prototype.dealVideo=(video) =>{
  return video.replace(/http\w{0,1}:\/\//, 'http://')
}
// 防止点击事件影响滑动事件
Vue.prototype.dealTouchStart = (e,$el, fn) => {
  let touchStartX = e.changedTouches[0].clientX; 
  let touchStartY = e.changedTouches[0].clientY; 
  $el.addEventListener('touchend', (e) => {
  if ((touchStartX-e.changedTouches[0].clientX > -1) && (touchStartX-e.changedTouches[0].clientX< 1&&touchStartY-e.changedTouches[0].clientY > -1&&touchStartY-e.changedTouches[0].clientY < 1)) {
      fn()
    }
  })
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
