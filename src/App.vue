<template>
    <div v-if="!isAuth">
      <router-view />
    </div>
    <div v-else>
      <homeView />
    </div>
</template>

<script>

import homeView from './views/homeView.vue';
export default {
  components: { homeView },
  data() {
    return {
      isAuth: false
    }
  },
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      try {
        const authToken = localStorage.getItem('jwtToken');
        this.isAuth = Boolean(authToken);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    },
  },
}
</script>

<style scoped></style>