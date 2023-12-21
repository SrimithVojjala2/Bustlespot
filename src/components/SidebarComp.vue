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
                    <li >
                        <router-link to="/organisation" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    corporate_fare
                                </span>
                                <span class="logo-title">Organisation</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activity" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    history
                                </span>
                                <span class="logo-title">Activity</span>
                            </div>
                        </router-link>
                    </li>
                    <li >
                        <router-link to="/projects" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    dynamic_feed
                                </span>
                                <span class="logo-title">Projects</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/tasks" class="routelink-container" active-class="active">
                            <div class="routelink">
                                <span class="material-symbols-outlined logo">
                                    format_list_bulleted
                                </span>
                                <span class="logo-title">Tasks</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/report" class="routelink-container" active-class="active">
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
                    <div class="routelink-container" @click="logout">
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
</template>

<script>
export default {
    name:'SideBar',
    props:['isOganisationPresent'],
    methods:{
        logout(){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('UserInfo');
            localStorage.removeItem('organisation')
            window.location.reload();
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

.list .active{
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

.routelink-container:hover{
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

</style>