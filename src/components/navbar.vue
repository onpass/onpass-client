<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img v-bind:src="'../src/assets/onpass.png'">
                    OnPass
                </a>
            </div>
            <div class="navbar-end">
                <div v-if="loggedIn==true" class="navbar-item">
                    <div class="container">
                    <router-link to="/home" class="button">
                        <strong>Home</strong>
                    </router-link>
                    <router-link to="/login" class="button">
                        <strong>Logout</strong>
                    </router-link>
                </div>
                </div>
                <div v-if="loggedIn!=true">
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

<style scoped>

</style>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Navigation',
    computed: {
        ...mapState({
            loggedIn: state => state.account.status.loggedIn,
        })
    }
}
</script>