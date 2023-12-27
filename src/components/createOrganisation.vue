<template>
    <div>
        <button @click="$emit('changecurrentComp','organisationComp')">back</button>
    </div>
</template>

<script>
    export default {
        emits:['changecurrentComp']
    }
</script>

<style scoped>

</style>