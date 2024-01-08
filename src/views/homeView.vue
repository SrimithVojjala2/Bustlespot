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
                                <component :is="Component" :key="$route.path"/>
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
import { ElLoadingService } from 'element-plus';
export default {
    data() {
        return {
            isPrimeMember: null,
            isOganisationPresent: null,
            loadingInstance: null,
        }
    },
    components: { SideBar, HeaderBar },
    mounted() {
        this.loadingInstance = ElLoadingService({
            fullscreen: true,
            text: 'Loading...', 
        });
        setTimeout(() => {
            this.isPrimeMember = JSON.parse(localStorage.getItem('UserInfo')).isPrimeMember;
            this.isOganisationPresent = JSON.parse(localStorage.getItem('UserInfo')).isOganisationPresent;
            this.loadingInstance.close();
        }, 1000);
    },
    beforeUnmount(){
        if (this.loadingInstance) {
            this.loadingInstance.close();
        }
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
    height: 100%;
    width: calc(100vw - 252px);
    overflow-y: auto;
}

.router-view {
    width: 100%;
}
</style>