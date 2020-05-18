<template>
    <div class="text-center justify-center">
        <h1 style="font-size:80px">Simplify your online life.</h1>
        <h3 style="font-size:30px">OnPass remembers all your passwords across every device!</h3>
        <div v-if="loggedIn==true">
            <router-link to="/home" class="button is-large">
                <strong>Home</strong>
            </router-link>
        </div>
        <div v-else>
            <router-link to="/register" class="button is-large">
                <strong>Sign in</strong>
            </router-link>
        </div>
        <img v-bind:src="'../src/assets/logo.png'">
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"NewsPage",
    computed: {
        ...mapState({
            loggedIn: state => state.account.status.loggedIn,
        })
    }
};

</script>