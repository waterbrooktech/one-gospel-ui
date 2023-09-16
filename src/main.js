import './assets/main.css';

import { createApp } from 'vue';
import { createStore } from 'vuex';
import Toast from 'vue-toastification';
import VuexPersistence from 'vuex-persist';
import CKEditor from '@ckeditor/ckeditor5-vue';

import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const store = createStore({
  state() {
    return {
      user: {
        email: null,
        name: null,
        phoneNumber: null
      }
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.user = payload;
    }
  },
  plugins: [vuexLocal.plugin]
});

const app = createApp(App)

app.use(router)
app.use(store);

app.use(CKEditor);
app.use(Toast, {
  toastClassName: "toast-class",
  position: 'bottom-right'
});

app.mount('#app')
