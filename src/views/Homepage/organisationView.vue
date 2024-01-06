<template>
    <div>
        <component :is="currentComp" @changecurrentComp="changecurrentComp"></component>
    </div>
</template>

<script>
import organisationComp from '@/components/organisation.vue';
import createOrgComp from '@/components/createOrganisation.vue';
import editOrganization from '@/components/editOrganization.vue';
    export default {
        components:{organisationComp,createOrgComp,editOrganization},
        data(){
            return{
                currentComp: 'organisationComp',
            }
        },
        methods:{
            changecurrentComp(value){
                this.currentComp = value
            }
        }
    }
</script>

<style scoped>

</style>