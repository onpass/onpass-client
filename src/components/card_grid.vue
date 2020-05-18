<script>
import VueFlip from 'vue-flip';
export default {
    name: "CardGrid",
    props: ['cards'],
    data() {
        return {
            numberOfColumns: 9,
        }
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
    },
    },
    methods: {
        addCard() {
            this.cards.push('new-card')
        },
    },
    components:{
        'vue-flip': VueFlip
    }
}
</script>

<style scoped>
    .card-list {
    display: grid;
    grid-gap: 0.5em;
}

.card-item {
    padding: 0.1em;
}

body {
    background: #20262E;
    padding: 20px;
    font-family: Helvetica;
}

my-card-grid {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    transition: all 0.2s;
}

ul {
    list-style-type: none;
}
.front {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.back {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.card {
    width: 150px;
    height: 200px;
}
</style>

<template>
    <div id="my-card-grid">
        <strong>Columns:</strong> <input v-model.number="numberOfColumns" class="input" size="3">
        <ul :style="gridStyle" class="card-list">
            <li v-for="item in cards" :key=item.name class="card-item">
                <vue-flip active-click transition="0.5s" width=150px height=200px>
                    <template v-slot:front class="front">
                        <div class="card">
                            <div class="card-image">
                                <div class="text-center" width="150px" height="150px">
                                    <figure  class="image is-150x150">
                                        <img v-bind:src="'//logo.clearbit.com/' + item.name" alt="No photo">
                                    </figure>
                                </div>
                            </div>
                            <div class="card-header">
                                <p class="title is-6">{{item.name}}</p>
                            </div>
                        </div>
                    </template>
                    <template v-slot:back class="back">
                        <div class="card">
                            <div class="card-content">
                                <p>Login:</p>
                                <p class="subtitle is-4">{{item.login}}</p>
                                <p>Password:</p>
                                <p class="subtitle is-6">{{item.pwd}}</p>
                            </div>
                        </div>
                    </template>
                </vue-flip>
                
            </li>
        </ul>
        <button class="button" @click="addCard">
            Add card
        </button>
    </div>
</template>
