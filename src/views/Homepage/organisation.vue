<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        organisation
    </div>
    <div v-for="(i,index) in userDetails" :key="index">
        {{ i }}
    </div> 
</template>

<script>
export default {
    props:['userDetails'],
    data() {
        return {
        }
    },
}
</script>

<style scoped></style>