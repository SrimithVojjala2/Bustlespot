<!-- eslint-disable vue/no-mutating-props -->
<template>
<div class="userInfo-projects-container">
            <div class="userInfo-projects-navbar">
                <div class="userInfo-projects-navbar-tabs" style="    overflow: hidden;margin-bottom: 0px;">
                    <div class="navbar-tabs">
                        <div>
                            <el-button class="navbar-tab" @click="$router.push('/profile')">
                                USER INFO
                            </el-button>
                            <span style="left:0;width:117.531px ;" v-if="$route.path === '/profile'" class="active"></span>
                        </div>
                        <div>
                            <el-button class="navbar-tab" @click="$router.push('/profile/projects')">
                                PROJECTS
                            </el-button>
                            <span style="left:0;width:117.531px ;" v-if="$route.path === '/profile/projects'" class="active"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="userDetails-container">
                <div style="margin: 1rem 2rem;">
                    <div class="userDetails">
                        <div>
                            <label class="label">First name</label>
                            <div class="input-container">
                                <el-input class="input" v-model="userInfo.firstName" readonly>
                                    <template #prefix>
                                        <el-icon size="20">
                                            <UserFilled />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                        <div>
                            <label class="label">Last name</label>
                            <div class="input-container">
                                <el-input class="input" v-model="userInfo.lastName" readonly>
                                    <template #prefix>
                                        <el-icon size="20">
                                            <UserFilled />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                        <div>
                            <label class="label">Email ID</label>
                            <div class="input-container">
                                <el-input class="input" v-model="userInfo.email" readonly>
                                    <template #prefix>
                                        <el-icon size="20">
                                            <Message />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                        <div>
                            <label class="label">Role</label>
                            <div class="input-container">
                                <el-input class="input" v-model="userInfo.role" readonly>
                                    <template #prefix>
                                        <el-icon size="20">
                                            <Briefcase />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                        <div>
                            <label class="label">No of Projects</label>
                            <div class="input-container">
                                <el-input class="input" v-model="userInfo.projects" readonly>
                                    <template #prefix>
                                        <span class="material-symbols-outlined">
                                            dynamic_feed
                                        </span>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { Briefcase,  Message, UserFilled } from '@element-plus/icons-vue';

    export default {
        props:['userInfo'],
        components: { UserFilled, Message, Briefcase },

    }
</script>

<style scoped>

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

.userDetails-container {
    padding: 0px;
    height: calc(100% - 48px);
}

.userDetails-container .userDetails {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    box-shadow: rgba(200, 200, 200, 0.9) 0px 0px 10px;
    padding: 20px 30px;
}

@media(max-width: 1080px) {
    .userDetails-container .userDetails {
        grid-template-columns: 1fr;
    }
}

.label {
    color: darkgray;
    font-size: 12px;
}

.active {
    position: absolute;
    height: 2px;
    bottom: 0px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(242, 60, 75);
}

.input-container {
    margin-top: 15px;
    margin-bottom: 30px;
}

.input {
    height: 40px;
}
</style>