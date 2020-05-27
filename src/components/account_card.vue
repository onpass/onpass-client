<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
import {router} from "../_helpers/router"
const config = require("../config.json")
import Vue from '../index';
export default {
    props: ['user'],
    name:"AccountCard",
    data: () => {
        return {
            hover : false,
            showSettingsFlag : false,
            showDeleteFlag : false,
            pwdFieldType : "password",
            props_copy : {},
            deleted :false,
            temp: {
                website : '',
                login : '',
                password : ''
            }
        }
    },
    methods: {
        switchVisibility() {
            this.pwdFieldType = this.pwdFieldType === "password" ? "text" : "password"
        },
        showSettings() {
            this.temp = JSON.parse(JSON.stringify(this.$props.user))
            this.showSettingsFlag = !this.showSettingsFlag
        },
        closeSettings() {
            this.showSettingsFlag = !this.showSettingsFlag
            this.$props.user = JSON.parse(JSON.stringify(this.temp))
        },
        showDelete() {
            this.showDeleteFlag = !this.showDeleteFlag
        },
        del_card() {
            axios({
                method:"DELETE",
                url: `${config.apiUrl}/entry`,
                data: {
                    id : this.$props.user.id
                },
                headers: {'Content-Type':'application/json'}
            })
            this.showDeleteFlag = !this.showDeleteFlag
            this.$forceUpdate()
        },
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (true) {
                    let {website, login, password} = this
                    axios({
                        method:"PATCH",
                        url: `${config.apiUrl}/entry`,
                        data: {
                            ...this.$props.user
                        },
                        headers: {'Content-Type':'application/json'}
                    }).then(Response => {this.submitted=false; this.showSettingsFlag = !this.showSettingsFlag})
                }
            });
        }
    }
}
</script>

<style scoped>
    .card-footer {
        background-color:lightskyblue;
    }
    ion-icon {
        font-size: 24px;
    }
    .card {
        width: 100%;
        height: 100%;
    }
    .card-footer {
        padding: 0%;
        margin: 0%;
    }
</style>

<template>
    <div class="card" @mouseover="hover = true" @mouseleave="hover = false" v-if="!deleted">
        <div class="card-image">
            <div class="text-center" width="15px" height="15px">
            </div>
        </div>
        <div class="card-content">
            <p><strong>{{user.website}}</strong></p>
            <p><small>{{user.login}}</small></p>
        </div>
        <div class="card-footer" height="100%">
            <a class="card-footer-item" @click="showSettings" v-if="hover">
                <ion-icon name="construct"></ion-icon>
            </a>
            <a class="card-footer-item" @click="showDelete" v-if="hover">
                <ion-icon name="close-circle"></ion-icon>
            </a>
        </div>

        <div class="modal" :class="{'is-active': showSettingsFlag}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Your Data</p>
                </header>
                <section class="modal-card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="website">website</label>
                            <input type="text" v-model="user.website" name="website" class="form-control" :class="{ 'is-invalid': user.website === '' }" />
                        </div>
                        <div class="form-group">
                            <label for="login">login</label>
                            <input type="text" v-model="user.login" name="login" class="form-control" :class="{ 'is-invalid': user.login === '' }" />
                        </div>
                        <div class="form-group">
                            <label for="password">password</label>
                            <input :type="pwdFieldType" v-model="user.password" name="password" class="form-control" :class="{ 'is-invalid': user.password === '' }" />
                            <button type="button" class="button" @click="switchVisibility">{{pwdFieldType === "password" ? "show password" : "hide password"}}</button>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" @click="handleSubmit">Save</button>
                    <button class="button" @click="closeSettings">Close</button>
                </footer>
        </div>
        </div>

        <div class="modal" :class="{'is-active': showDeleteFlag}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{"Delete site " + user.website + "?"}}</p>
                </header>
                <footer class="modal-card-foot">
                    <button class="button" @click="del_card">Delete</button>
                    <button class="button" @click="showDelete">Close</button>
                </footer>
            </div>
        </div>
    </div>
</template>