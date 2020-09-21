import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from "vue-axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//富文本编辑器
import QuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
Vue.use(QuillEditor);

Vue.use(VueAxios,axios);

Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
