<template>
    <div class="container">
        <div>
            <sidebar />
        </div>
        <div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.path" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarComp.vue';
export default {
    data() {
        return {
        }
    },
    components: { Sidebar },

}
</script>

<style scoped>
.container{
    display: flex;
    height: 100vh;
}
</style>