import Vue from 'vue';
//import VueCookies from 'vue-cookies';
import VeeValidate from 'vee-validate';
import AsyncComputed from 'vue-async-computed'

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);
Vue.use(AsyncComputed)
//Vue.use(VueCookies);

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

//Vue.$cookies.set('nevergonnagiveyouup', "fake-jwt-token",'1h');

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});