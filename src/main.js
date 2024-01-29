import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueTouch from 'vue-touch'

createApp(App).use(store).use(router).use(vueTouch,{name:'v-touch'}).mount('#app')
