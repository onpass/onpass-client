<template>
    <div class="align-center justify-center">
        <p class="is-size-4">
            {{"Hi, " + username}}
        </p>
        <CardGrid
        :cards=layout>
        </CardGrid>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CardGrid from '../components/card_grid'

export default {
    components: {
        'CardGrid': CardGrid
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            username: state => state.account.user.username
        })
    },
    created () {
        this.getAllUsers();
    },
    data: function() {  
        return {
            layout: [
            {name:"facebook.com", login:"Tarikan", pwd:"12321"},
            {name:"gmail.com", login:"Tar1kan", pwd:"32131"},
            {name:"vk.com", login:"Tarikan", pwd:"12321"},
            {name:"youtube.com", login:"Tarikan", pwd:"12321"},
            {name:"wikipedia.org", login:"Tarikan", pwd:"12321"},
            {name:"gog.com", login:"Tarikan", pwd:"12321"},
        ],
        };
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};

</script>


