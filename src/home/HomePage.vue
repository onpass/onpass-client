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