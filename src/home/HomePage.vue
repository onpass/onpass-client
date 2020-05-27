<template>
    <div class="align-center justify-center">
        <CardGrid
        :cards=cards_list>
        </CardGrid>
    </div>
</template>

<script>
/**
 * HomePage component
 */
import CardGrid from '../components/card_grid'
import axios from "axios"
const config = require("../config.json")
export default {
    data: () => {
        return {
            layout: [
            {website:"facebook.com", login:"Tarikan", password:"12321"},
            {website:"gmail.com", login:"Tar1kan", password:"32131"},
            {website:"vk.com", login:"Tarikan", password:"12321"},
            {website:"youtube.com", login:"Tarikan", password:"12321"},
            {website:"wikipedia.org", login:"Tarikan", password:"12321"},
            {website:"gog.com", login:"Tarikan", password:"12321"},
            ],
            cards_list: []
        };
    },
    components: {
        'CardGrid': CardGrid
    },
    created() {
        axios.get(`${config.apiUrl}/entry/`).then(response => this.cards_list = response.data.entries ).catch(e => console.log(e.toString()))
    },

};
</script>