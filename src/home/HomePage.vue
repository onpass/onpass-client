<template>
    <div class="col-xl-10 offset-xl-1">
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
        <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="false"
            :is-resizable="false"
            :vertical-compact="true"
            :margin="[20, 20]"
            :use-css-transforms="true"
    >
            <grid-item v-for="item in layout"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.i">
                <div class="v-card v-card--rised card">
                    <div class="v-card__title card-header">
                        {{"site"+item.i}}
                    </div>
                    <div class="v-card__subtitle card-content">
                        {{"login"+item.i}}
                    </div>
                    <div class="v-card__subtitle card-content">
                        {{"pwd"+item.i}}
                    </div>
                </div>
            </grid-item>
        </grid-layout>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueGridLayout from 'vue-grid-layout'

export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem
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
            {"x":0,"y":0,"w":2,"h":2,"i":"0"},
            {"x":2,"y":0,"w":2,"h":2,"i":"1"},
            {"x":4,"y":0,"w":2,"h":2,"i":"2"},
            {"x":6,"y":0,"w":2,"h":2,"i":"3"},
            {"x":8,"y":0,"w":2,"h":2,"i":"4"},
            {"x":10,"y":0,"w":2,"h":2,"i":"5"},
            {"x":0,"y":5,"w":2,"h":2,"i":"6"},
            {"x":2,"y":5,"w":2,"h":2,"i":"7"},
            {"x":4,"y":5,"w":2,"h":2,"i":"8"},
            {"x":6,"y":3,"w":2,"h":2,"i":"9"},
            {"x":8,"y":4,"w":2,"h":2,"i":"10"},
            {"x":10,"y":4,"w":2,"h":2,"i":"11"},
            {"x":0,"y":10,"w":2,"h":2,"i":"12"},
            {"x":2,"y":10,"w":2,"h":2,"i":"13"},
            {"x":4,"y":8,"w":2,"h":2,"i":"14"},
            {"x":6,"y":8,"w":2,"h":2,"i":"15"},
            {"x":8,"y":10,"w":2,"h":2,"i":"16"},
            {"x":10,"y":4,"w":2,"h":2,"i":"17"},
            {"x":0,"y":9,"w":2,"h":2,"i":"18"},
            {"x":2,"y":6,"w":2,"h":2,"i":"19"}
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


