<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="main-container-wrapper">
        <div class="profile-username-container">
            <div class="profile-container">
                <div class="profile">
                    V
                </div>
                <div class="input-photo-container">
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
        <div class="update-profile">
            <el-button class="update-profile-btn">
                update Profile
            </el-button>
        </div>
        <userInfoCard  :userInfo="userInfo"/>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';
import { Briefcase, CameraFilled, Message, UserFilled } from '@element-plus/icons-vue'
import UserInfoCard from '@/components/userInfoCard.vue';
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: { CameraFilled, UserFilled, Message, Briefcase,UserInfoCard },
    data() {
        return {
            userInfo: '',
        }
    },
    mounted() {
        this.userDetails();
        console.log('hell');
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
                }
            }
            catch (error) {
                console.error(error)
            }
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

</style>