<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="view-container">
        <div class="image-container">
            <BackgroundImage />
        </div>
        <div class="router-view-container">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.path" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>

<script>
import BackgroundImage from '@/components/backgroundImage.vue';
export default {
    components: { BackgroundImage }
}
</script>

<style scoped>
@import url("./Authpage.css");
</style>