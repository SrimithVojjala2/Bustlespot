<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="sidebar-main-container">
        <div class="sidebar-logo-container">
            <img src="../assets/images/BustlespotIcon.svg" alt="noLogo" class="sidebar-logo">
            <div class="title">BUSTLESPOT</div>
        </div>
        <div class="sidebar-section-container">
            <div class="section-container">
                <ul class="list" v-if="isOganisationPresent">
                    <li>
                        <router-link :to="{ name: 'organisation' }" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    corporate_fare
                                </span>
                                <span class="logo-title">Organizations</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Activity' }" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    history
                                </span>
                                <span class="logo-title">Activity</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Projects' }" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    dynamic_feed
                                </span>
                                <span class="logo-title">Projects</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Tasks' }" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    format_list_bulleted
                                </span>
                                <span class="logo-title">Tasks</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Teams' }" class="routelink-container" active-class="active"
                            v-if="isAdmin">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    groups
                                </span>
                                <span class="logo-title">Teams</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Members' }" class="routelink-container" active-class="active"
                            v-if="isAdmin">
                            <div class="routelink">
                                <span class="material-symbols-outlined">
                                    group
                                </span>
                                <span class="logo-title">Members</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'InviteMembers' }" class="routelink-container" active-class="active"
                            v-if="isAdmin">
                            <div class="routelink">
                                <span class="material-symbols-outlined">
                                    person_add
                                </span>
                                <span class="logo-title">Invite Members</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Report' }" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    summarize
                                </span>
                                <span class="logo-title">Report</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="danger-btns">
                <div class="btn-danger">
                    <div class="routelink-container">
                        <div class="routelink">
                            <span class="material-symbols-outlined">
                                download_2
                            </span>
                            <span class="logo-title">Download</span>
                        </div>
                    </div>
                </div>
                <div class="btn-danger">
                    <div class="routelink-container" @click="logoutPopup = true">
                        <div class="routelink">
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                            <span class="logo-title">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <el-dialog v-model="logoutPopup" title="Logout" width="350px" align-center :show-close="false">
            <span class="dialog-description">Are you sure, do you want to Logout?</span>
            <template #footer>
                <span>
                    <el-button @click="logoutPopup = false" class="dialog-btn">Cancel</el-button>
                    <el-button type="primary" @click="logout" class="dialog-btn">
                        Logout
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'SideBar',
    data() {
        return {
            isOganisationPresent: null,
            logoutPopup: false,
        }
    },
    computed: {
        ...mapState(['roleId']),
        isAdmin() {
            return this.roleId === 1 || this.roleId === 2
        }
    },
    mounted() {
        this.isOganisationPresent = JSON.parse(localStorage.getItem('UserInfo')).isOganisationPresent;
    },
    methods: {
        logout() {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('UserInfo');
            localStorage.removeItem('organisation')
            window.location.reload()
        }
    },
}
</script>

<style scoped>
.sidebar-main-container {
    min-width: 252px;
    height: 100vh;
    background-color: rgb(37, 37, 37);
    display: flex;
    flex-direction: column;
}

.sidebar-logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0%;
    margin-right: 10px;
    padding: 10px 15px;
}

.sidebar-logo {
    margin-right: 8px;
}

.list .active {
    color: rgb(255, 87, 34);
}


.title {
    user-select: none;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    color: white;
    align-self: center;
    letter-spacing: 0.15px;
}

.sidebar-section-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    overflow: hidden;
}

.sidebar-section-container .section-container {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    flex: 40 1 0%;
    display: flex;
    flex-direction: row;
    line-height: 1.5;
    height: 80%;
}

.section-container .list {
    list-style: none;
    padding: 0px;
    margin: 16px 0px 16px 0px;
    width: 252px;
    z-index: 2;
    overflow: hidden auto;
}

.routelink-container {
    color: rgb(124, 124, 124);
    text-decoration: none;
}

.routelink-container:hover {
    text-decoration: none;
    color: rgb(255, 87, 34);
    outline: none;
    cursor: pointer;
}

.routelink {
    border-radius: 4px;
    display: flex;
    padding: 12px 16px;
    -webkit-box-align: center;
    align-items: center;
    width: max-content;
}

.routelink .logo-title {
    font-size: 14px;
    margin-left: 16px;
}

.logo {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: #7C7C7C;
    flex-shrink: 0;
    font-size: 1.5rem;
}

.danger-btns {
    display: flex;
    flex-direction: column;
    color: rgb(124, 124, 124);
    cursor: pointer;
    width: fit-content;
    margin-bottom: 1rem;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}

.dialog-description {
    font-size: 16px;
}

.dialog-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    min-width: 64px;
    padding: 6px 16px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    color: rgb(255, 255, 255);
    border: none;
    outline: none;
    font-size: 12px;
    border-radius: 5px;
    background-color: rgb(255, 93, 59);
    margin: 5px;
    text-transform: capitalize;
    font-family: "Avenir Next LT Pro" !important;
}

.dialog-btn:hover {
    color: white;
    text-decoration: none;
    background-color: rgb(169, 42, 52);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
}
</style>
