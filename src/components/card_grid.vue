<script>
/**
 * Grid each entry
 * @param {cards}
 */
import axios from 'axios'
axios.defaults.withCredentials = true;
const config = require("../config.json")
import VueFlip from 'vue-flip';
import AccountCard from "../components/account_card"
export default {
    name: "CardGrid",
    props: ['cards'],
    data() {
        return {
            numberOfColumns: 4,
            showModalFlag: false,
            website: '',
            login: '',
            password: '',
            user: {website:"facebook.com", login:"Tarikan", password:"12321"}
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
        /**
     * Show/hide modal "Add card"
     */
        showModal() {
            this.showModalFlag = !this.showModalFlag;
            this.website = ''
            this.login = ''
            this.password = ''
        },
        /**
         * Submit new entry
         */
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
        'vue-flip': VueFlip,
        'acc-card': AccountCard
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
    transition: all 0.1s;
}

ul {
    list-style-type: none;
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
                <acc-card
                :user=item>
                </acc-card>
            </li>
        </ul>
        <br>
        <button class="button" @click="showModal">
            Add new password
        </button>
    </div>
</template>
