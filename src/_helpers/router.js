import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import NewsPage from '../news/NewsPage'
import {store} from "../_store/index"
const config = require("../config.json")
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: NewsPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/home', component: HomePage },

    // otherwise redirect to news
    { path: '*', redirect: '/' }
  ],
});

function getLoggedInStatus () {
  return fetch(`${config.apiUrl}/auth/check`, {
    method: "POST",
    credentials: 'include',
    headers: {'Content-Type':'application/json'}
})
}

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  store.state.account.status.loggedIn = true
  getLoggedInStatus().then(
    (response) => {
      if(!response.ok && authRequired) {
        //Object.assign(data, {loggedIn : false})
        store.state.account.status.loggedIn = false
        next("/login")
      }
      else {
        console.log("loggedin")
        store.state.account.status.loggedIn = true
        next()
      }
    }
  )
})