<template>
        <div class="col-xm-12">
            <navbar></navbar>
            <br>
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <router-view></router-view>
            
        </div>
</template>

<script>
/**
 * @version 0.1
 */
import { mapState, mapActions } from 'vuex';
import Navigation from "../components/navbar";

/**
 * init App component
 */
export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    },
    components: {
        "navbar" : Navigation
    }
};
</script>