<template>
    <div class="container">
        <keep-alive>
            <div>
                <SideBar />
            </div>
        </keep-alive>
        <div class="section">
            <div>
                <HeaderBar />
            </div>
            <div>
                <div>
                    <div v-if="!isOganisationPresent">
                        not in an organisation
                    </div>
                    <div v-if="isOganisationPresent" class="router-view">
                        <router-view v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" :key="$route.path"/>
                            </keep-alive>
                        </router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SidebarComp.vue';
import HeaderBar from '@/components/headerBar.vue';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            isPrimeMember: null,
            isOganisationPresent: null,
        }
    },
    components: { SideBar, HeaderBar },
    created() {
        this.isPrimeMember = JSON.parse(localStorage.getItem('UserInfo')).isPrimeMember
        this.isOganisationPresent = JSON.parse(localStorage.getItem('UserInfo')).isOganisationPresent;
    },
    methods:{
        ...mapMutations(['activeOrgListChange'])
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
}

.section {
    width: 100%;
}

.router-view {
    width: 100%;
}
</style>