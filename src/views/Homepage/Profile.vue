<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-loading v-loading.fullscreen.lock="loading" text="Loading..." background="rgba(255, 255, 255, 0.7)">
        <div class="main-container-wrapper">
            <div class="profile-username-container">
                <div class="profile-container">
                    <div class="profile">
                        <keep-alive>
                            <img :src="userInfo.profileImage" class="profile-image">
                        </keep-alive>
                    </div>
                    <div class="input-photo-container" :class="{ 'isnotActive': $route.path === '/profile/projects' }">
                        <el-button class="btn-camera" type="primary">
                            <el-icon class="icon-camera">
                                <CameraFilled />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
                <p class="username">
                    Vojjala srimith
                </p>
            </div>
            <div class="update-profile" :class="{ 'isnotActive': $route.path === '/profile/projects' }">
                <el-button class="update-profile-btn">
                    update Profile
                </el-button>
            </div>
            <div class="userInfo-projects-container">
                <div class="userInfo-projects-navbar">
                    <div class="userInfo-projects-navbar-tabs" style="overflow: hidden;margin-bottom: 0px;">
                        <div class="navbar-tabs">
                            <div>
                                <el-button class="navbar-tab" @click="pushRoute('/profile')">
                                    USER INFO
                                </el-button>
                                <div>
                                    <span style="width:117.531px ;" v-if="$route.path === '/profile'" class="active"></span>
                                </div>
                            </div>
                            <div>
                                <el-button class="navbar-tab" @click="pushRoute('/profile/projects')">
                                    PROJECTS
                                </el-button>
                                <div>
                                    <span style="width:117.531px ;" v-if="$route.fullPath === '/profile/projects'"
                                        class="active"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" :key="$route.path" :userInfo="userInfo" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </el-loading>
</template>

<script>
import axios from 'axios';
import { Briefcase, CameraFilled, Message, UserFilled } from '@element-plus/icons-vue'
import UserInfoCard from '@/components/userInfoCard.vue';
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: { CameraFilled, UserFilled, Message, Briefcase, UserInfoCard },
    data() {
        return {
            userInfo: '',
            isActive: true,
            loading: true,
        }
    },
    computed:{
        ...mapState(['activeOrgList'])
    },
    mounted() {
        this.userDetails();
    },
    methods: {
        async userDetails() {
            try {
                const token = localStorage.getItem('jwtToken');
                const organisationId = localStorage.getItem('organisation');
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/auth/userDetails`, organisationId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });

                if (response.status === 200) {
                    this.userInfo = response.data.data.user[0];
                    this.loading = false
                }
            }
            catch (error) {
                console.error(error)
            }
        },
        changeIsActive(val) {
            this.isActive = val
        },
        pushRoute(val) {
            if (val === '/profile') {
                this.$router.push(val)
            }
            else {
                this.$router.push(val)
            }
        }
    },
    watch:{
        activeOrgList(){
            this.loading =true;
            this.userDetails();
        }
    }
}
</script>

<style scoped>
.main-container-wrapper {
    height: calc(100% - 82px);
}

.profile-username-container {
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}

.profile-container {
    display: inline-block;
    position: relative;
    cursor: pointer;
}

.profile-username-container .username {
    font-size: 17px;
    font-weight: 600;
    color: rgb(105, 105, 105);
    margin-top: 5px;
}

.profile-container .profile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
    user-select: none;
    color: rgb(255, 255, 255);
    background-color: rgb(189, 189, 189);
    box-shadow: grey 0px 0px 20px;
    border: 4px solid rgb(255, 255, 255);
    height: 130px;
    width: 130px;
}

.input-photo-container {
    position: absolute;
    top: 85%;
    left: 75%;
}

.btn-camera {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    font-size: 1.5rem;
    padding: 8px;
    border-radius: 50%;
    overflow: visible;
    color: rgba(0, 0, 0, 0.54);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.btn-camera:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.update-profile {
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: white;
    flex-direction: row-reverse;
}

.update-profile-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    outline: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    min-width: 64px;
    border-radius: 4px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(255, 87, 34);
    border: none;
    text-transform: capitalize;
    padding: 1px 6px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    font-family: "Avenir Next LT Pro" !important;
    background-color: white !important;
    box-shadow: none !important;
    margin-right: 40px !important;
}

.profile-image {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
    color: transparent;
    text-indent: 10000px;
    background-color: white;
}

.isnotActive {
    display: none;
}

.userInfo-projects-container {
    margin-top: 1rem;
    height: calc(100% - 230px);
    width: 100%;
}

.userInfo-projects-navbar {
    overflow: hidden;
    min-height: 48px;
    display: flex;
}

.userInfo-projects-navbar-tabs {
    position: relative;
    display: inline-block;
    flex: 1 1 auto;
    white-space: nowrap;
    width: 100%;
}

.userInfo-projects-navbar-tabs .navbar-tabs {
    display: flex;
}

.navbar-tabs .navbar-tab {
    font-size: 15px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    border-radius: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.25;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    max-width: 360px;
    min-width: 90px;
    position: relative;
    min-height: 48px;
    flex-shrink: 0;
    padding: 12px 16px;
    overflow: hidden;
    white-space: normal;
    text-align: center;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.6);
}

.active {
    position: absolute;
    height: 2px;
    bottom: 0px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(242, 60, 75);
}
</style>