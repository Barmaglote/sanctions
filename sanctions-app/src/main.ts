import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { loadFonts } from './plugins/webfontloader';
import Ripple from 'primevue/ripple';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import '/node_modules/primeflex/primeflex.css';
import 'primeicons/primeicons.css';  
import './assets/base.css';
import './assets/overrides.css';

loadFonts()

createApp(App)
  .use(router)
  .use(PrimeVue, {ripple: true})
  .use(createPinia())
  .directive('ripple', Ripple)
  .mount('#app');
  
