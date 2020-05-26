<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const config = require("../config.json")
import VueFlip from 'vue-flip';
export default {
    name: "CardGrid",
    props: ['cards'],
    data() {
        return {
            numberOfColumns: 9,
            showModalFlag: false,
            website: '',
            login: '',
            password: '',
        }
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
    },
    },
    methods: {
        showModal() {
            this.showModalFlag = !this.showModalFlag;
            this.website = ''
            this.login = ''
            this.password = ''
        },
        handleSubmit(e) {
            
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    let {website, login, password} = this
                    axios.post(`${config.apiUrl}/entry`,
                        {website, login, password},
                        {headers: {'Content-Type':'application/json'}}).then(c => console.log(c)).catch(e => console.log(e.toString()))
                    this.cards.push({website, login, password})
                }
            });
        }
    },
    components:{
        'vue-flip': VueFlip
    }
}
</script>

<style scoped>
    .card-list {
    display: grid;
    grid-gap: 0.5em;
}

.card-item {
    padding: 0.1em;
}

body {
    background: #20262E;
    padding: 20px;
    font-family: Helvetica;
}

my-card-grid {
    background: #fff;
    border-radius: 4px;
    padding: 40px;
    transition: all 0.2s;
}

ul {
    list-style-type: none;
}
.front {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.back {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.card {
    width: 150px;
    height: 220px;
}
</style>

<template>
    <div id="my-card-grid">
        <div class="modal" :class="{'is-active': showModalFlag}" id="modal-gen-pwd">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add new password</p>
                </header>
                <section class="modal-card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="website">website</label>
                            <input type="text" v-model="website" name="website" class="form-control" :class="{ 'is-invalid': website === '' }" />
                        </div>
                        <div class="form-group">
                            <label for="login">login</label>
                            <input type="text" v-model="login" name="login" class="form-control" :class="{ 'is-invalid': login === '' }" />
                        </div>
                        <div class="form-group">
                            <label for="password">password</label>
                            <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': password === '' }" />
                        </div>
                        <div class="form-group">
                            <button class="button" type="submit">Add</button>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button type="submit" class="button" v-on:click="showModal">Close</button>
                </footer>
            </div>
        </div>
        <p class="is-size-4">Columns:</p> <input v-model.number="numberOfColumns" class="input" size="3">
        <ul :style="gridStyle" class="card-list">
            <li v-for="item in cards" :key=item.website class="card-item">
                <vue-flip active-click transition="0.5s" width=150px height=200px>
                    <template v-slot:front class="front">
                        <div class="card">
                            <div class="card-image">
                                <div class="text-center" width="150px" height="150px">
                                    <figure  class="image is-150x150">
                                        <img v-bind:src="'//logo.clearbit.com/' + item.website" alt="No photo">
                                    </figure>
                                </div>
                            </div>
                            <div class="card-header">
                                <p class="title is-6">{{item.website}}<br>{{item.login}}</p>
                            </div>
                        </div>
                    </template>
                    <template v-slot:back class="back">
                        <div class="card">
                            <div class="card-content">
                                <p>Password:</p>
                                <p class="subtitle is-6">{{item.password}}</p>
                            </div>
                        </div>
                    </template>
                </vue-flip>
            </li>
        </ul>
        <br>
        <button class="button" @click="showModal">
            Add new password
        </button>
    </div>
</template>
