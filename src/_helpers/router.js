import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import NewsPage from '../news/NewsPage'
import axios from "axios"
axios.defaults.withCredentials = true;

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
  /*
  const requestOptions = {
    headers: {'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": 'POST', "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept' },
    method: 'POST',
    credentials: 'same-origin'
  };
  return fetch(`${config.apiUrl}/auth/check`, requestOptions).ok;
  */
  return axios.post(`${config.apiUrl}/auth/check`,null, {
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
}
});
}

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  //const loggedIn = Vue.$cookies.isKey('nevergonnagiveyouup');
  //const loggedIn = !!state.status.loggedIn;
  //const loggedIn = getLoggedInStatus().then(c => console.log(c.status == 204))
  //let loggedIn = getLoggedInStatus().then(response => console.log(response.status))
  //console.log(loggedIn)
  let loggedIn;
  getLoggedInStatus().then((response) => {if(response.status === 204) {loggedIn = true}})
  console.log("router check " + loggedIn)

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})