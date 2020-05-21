<template>
    <div>
        <div class="modal" :class="{'is-active': showModalFlag}" id="modal-gen-pwd">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Generate random password</p>
                </header>
                <section class="modal-card-body">
                <!-- Content ... -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button" v-on:click="showModal">Close</button>
                </footer>
            </div>
        </div>
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img v-bind:src="'../src/assets/onpass.png'">
                    OnPass
                </a>
            </div>
            <div class="navbar-start">
                <div class="navbar-item">
                    <button class="button" v-on:click="showModal" aria-haspopup="true">
                        <strong>
                            Generate random password
                        </strong>
                    </button>
                </div>
            </div>
            <div class="navbar-end">
                <div v-if="loggedIn" class="navbar-item">
                    <div class="container">
                    <router-link to="/home" class="button">
                        <strong>Home</strong>
                    </router-link>
                    <router-link to="/login" class="button">
                        <strong>Logout</strong>
                    </router-link>
                </div>
                </div>
                <div v-if="!loggedIn">
                    <router-link to="/login" class="button">
                        <strong>Log in</strong>
                    </router-link>
                    <router-link to="/register" class="button">
                        <strong>Sign in</strong>
                    </router-link>
                </div>
            </div>
        </nav>
        
    </div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js'
import App from '../app/App'
import { mapState } from 'vuex';
const config = require("../config.json")
export default {
    name: 'Navigation',
    data: () => {
        return {
            showModalFlag: false,
            length: 8,
            letters: true,
            numbers: true,
            symbols: true,
            randPWD: ''
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.account.status.loggedIn,
            state1 : state => state
        })
    },
    methods: {
        showModal() {
            this.showModalFlag = !this.showModalFlag;
        },
        GetRandPwd() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors',
                body: JSON.stringify({ length, letters, numbers, symbols })
            };
            return fetch(`${config.apiUrl}/entry/new_password`, requestOptions)

        },
    }
}
</script>