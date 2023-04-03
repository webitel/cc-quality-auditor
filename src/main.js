import { createApp } from 'vue';
import App from './app.vue';
import router from './app/router';
import i18n from './app/locale/i18n';
import WebitelUi from './app/plugins/webitel-ui';
import store from './app/store';

// import './app/css/main.scss';


createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(...WebitelUi)
  .mount('#app');
