<template>
    <div>
        <div class="modal" :class="{'is-active': showModalFlag}" id="modal-gen-pwd">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Generate random password</p>
                </header>
                <section class="modal-card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="length">length</label>
                            <input type="text" v-model="length" name="length" class="form-control" :class="{ 'is-invalid': length<8 || length>127 }" />
                            <div v-show="submitted && (length<8 || length>127)" class="invalid-feedback">length must be in range [8, 127]</div>
                        </div>
                        <div class="form-group">
                            <label for="letters">letters</label>
                            <input type="checkbox" id="checkbox-letters" v-model="letters">
                        </div>
                        <div class="form-group">
                            <label for="numbers">numbers</label>
                            <input type="checkbox" id="checkbox-numbers" v-model="numbers">
                        </div>
                        <div class="form-group">
                            <label for="symbols">symbols</label>
                            <input type="checkbox" id="checkbox-symbols" v-model="symbols">
                        </div>
                        <div class="form-group">
                            <button class="button" v-on:click="GetRandPwd">Generate</button>
                        </div>
                        <div class="form-group">
                            <input class="input" v-model="randPWD" id="selectCategory" :readonly="true">
                        </div>
                    </form>
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
/**
 * Navigation
 */
import { mapState } from 'vuex';
const config = require("../config.json")
import {router} from '../_helpers'
export default {
    name: 'Navigation',
    data: () => {
        return {
            showModalFlag: false,
            length: 8,
            letters: true,
            numbers: true,
            symbols: false,
            randPWD: '',
            submitted: false,
            //loggedIn: router.options.props.loggedIn
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.account.status.loggedIn,
        })
    },
    methods: {
        /**
         * Show/hide modal "get random pwd"
         */
        showModal() {
            this.showModalFlag = !this.showModalFlag;
            this.length = 0,
            this.randPWD = ''
        },
        /**
         * Submit form and set rand password from API response
         */
        GetRandPwd() {
            this.submitted = true;
            let { length, letters, numbers, symbols } = this;
            //console.log(JSON.stringify({ length, letters, numbers, symbols }));
            
            fetch(`${config.apiUrl}/entry/new_password`, {
                method: "POST",
                body: JSON.stringify({ length, letters, numbers, symbols }),
                headers: {'Content-Type':'application/json'}
            }).then(c => c.json().then(v => this.randPWD = v)).catch(e => console.log(e.toString()))
        },
    }
}
</script>