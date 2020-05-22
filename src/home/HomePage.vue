<template>
    <div class="align-center justify-center">
        <!--
        <p class="is-size-4">
            {{"Hi, " + username}}
        </p>
        -->
        <CardGrid
        :cards=layout>
        </CardGrid>
    </div>
</template>

<script>
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
        };
    },
    components: {
        'CardGrid': CardGrid
    },
    computed: {
        cards_list: () => {
            let res = []
            axios.get(`${config.apiUrl}/entry/`).then(c => c.json().then(v => res = v)).catch(e => console.log(e.toString()))
            console.log(res)
            return res
        }
    },
};
</script>