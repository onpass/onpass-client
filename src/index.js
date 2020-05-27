/**
 * @namespace onpass
 */
import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

/**
 * init Vue instance
 */
Vue.use(VeeValidate);
/** @author Taras Ivanyshyn */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});