<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        name: 'App',
        computed: {
            ...mapState({
            }),
        },
        methods: {
            ...mapActions([]),
        },
        created() {
        },
    }
</script>
<style>
    @import "../static/css/color-dark.css";     /*深色主题*/
    @import "../static/css/main.css";
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>