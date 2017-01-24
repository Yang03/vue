import Vue from 'vue';
import App from './components/app.vue';
const VueApp = Vue.extend(App);

new VueApp().$mount('#app')

// const app = new VueApp({
//   el: '#app',
// })
