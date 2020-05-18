<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    OnPass
                </a>
            </div>
            <div class="navbar-end">
                <div v-if="loggedIn==true" class="navbar-item">
                    <p class="is-size-5">
                        {{"Hi " + username}}
                    </p>
                    <router-link to="/home" class="button is-primary">
                        <strong>Home</strong>
                    </router-link>
                </div>
                <div v-if="loggedIn!=true">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-primart">
                        <strong>Log in</strong>
                    </a>
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
            username: state => state.account.user.username
        })
    }
}
</script>