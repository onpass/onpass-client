<template>
    <div class="align-center justify-center">
        <h1>Hi {{account.user.firstName}}!</h1>
        <h3>Users from secure api end point:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{user.firstName + ' ' + user.lastName}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>
        <CardGrid
        :cards=layout>
        </CardGrid>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
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
            users: state => state.users.all
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


