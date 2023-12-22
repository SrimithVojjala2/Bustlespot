<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        organisation
    </div>
    <div v-for="(i, index) in userDetails" :key="index">
        {{ i }}
    </div>
    <div class="container">
        {{ invitations }}
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    props: ['userDetails'],
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState(['invitations'])
    },
    mounted() {
        this.getUserInvitaion();
    },
    methods: {
        ...mapActions(['getUserInvitaion'])
    }
}
</script>

<style scoped>
.container{
    display: block;
    word-break: break-all;
}
</style>