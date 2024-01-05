<!-- eslint-disable vue/no-mutating-props -->
<template>
    <!-- <div class="userInfo-projects-container">
        <div class="userInfo-projects-navbar">
            <div class="userInfo-projects-navbar-tabs" style="    overflow: hidden;margin-bottom: 0px;">
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
    </div> -->
    <div class="userDetails-container" v-show="$route.path === '/profile'">
        <div style="margin: 1rem 2rem;">
            <div class="userDetails">
                <div>
                    <label class="label">First name</label>
                    <div class="input-container">
                        <div class="el-input">
                            <el-input class="input" v-model="userInfo.firstName" readonly>
                                <template #prefix>
                                    <el-icon size="20">
                                        <UserFilled />
                                    </el-icon>
                                </template>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="label">Last name</label>
                    <div class="input-container">
                        <div class="el-input">
                            <el-input class="input" v-model="userInfo.lastName" readonly>
                                <template #prefix>
                                    <el-icon size="20">
                                        <UserFilled />
                                    </el-icon>
                                </template>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="label">Email ID</label>
                    <div class="input-container">
                        <div class="el-input">
                            <el-input class="input" v-model="userInfo.email" readonly>
                                <template #prefix>
                                    <el-icon size="20">
                                        <Message />
                                    </el-icon>
                                </template>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="label">Role</label>
                    <div class="input-container">
                        <div class="el-input">
                            <el-input class="input" v-model="userInfo.role" readonly>
                                <template #prefix>
                                    <el-icon size="20">
                                        <Briefcase />
                                    </el-icon>
                                </template>
                            </el-input>
                        </div>

                    </div>
                </div>
                <div>
                    <label class="label">No of Projects</label>
                    <div class="input-container">
                        <div class="el-input">
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
import { Briefcase, Message, UserFilled } from '@element-plus/icons-vue';

export default {
    props: ['userInfo'],
    components: { UserFilled, Message, Briefcase },
    data() {
        return {
        }
    },
}
</script>

<style scoped>
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


.input-container {
    margin-top: 15px;
    margin-bottom: 30px;
}

.input {
    height: 40px;
}


.input:hover {
    border: 1px solid red;
}
</style>