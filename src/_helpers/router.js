import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import NewsPage from '../news/NewsPage'

const config = require("../config.json")

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: NewsPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/home', component: HomePage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

function getLoggedInStatus () {
  const requestOptions = {
    headers: {'Access-Control-Allow-Credentials': 'true'},
    method: 'POST',
    credentials: 'include'
  };
  return fetch(`${config.apiUrl}/auth/check`, requestOptions).ok;
}

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  //const loggedIn = Vue.$cookies.isKey('nevergonnagiveyouup');
  //const loggedIn = !!state.status.loggedIn;
  const loggedIn = getLoggedInStatus()

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})