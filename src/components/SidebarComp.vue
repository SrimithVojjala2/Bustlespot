<template>
    <div class="sidebar-main-container">
        <div class="sidebar-logo-container">
            <img src="../assets/images/BustlespotIcon.svg" alt="noLogo" class="sidebar-logo">
            <div class="title">BUSTLESPOT</div>
        </div>
        <div class="sidebar-section-container">
            <div class="section-container">
                <ul class="list">
                    <li>
                        <router-link to="#" class="routelink-container">
                            <div class="routelink">
                                <img src="../assets/images/Organisation.svg" alt="organisation" class="logo">
                                <span class="logo-title">Organisation</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="#" class="routelink-container">
                            <div class="routelink">
                                <img src="../assets/images/Activity.svg" alt="organisation" class="logo">
                                <span class="logo-title">Activity</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="#" class="routelink-container">
                            <div class="routelink">
                                <img src="../assets/images/Organisation.svg" alt="organisation" class="logo">
                                <span class="logo-title">Projects</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="#" class="routelink-container">
                            <div class="routelink">
                                <img src="../assets/images/Organisation.svg" alt="organisation" class="logo">
                                <span class="logo-title">Tasks</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="#" class="routelink-container">
                            <div class="routelink">
                                <img src="../assets/images/Organisation.svg" alt="organisation" class="logo">
                                <span class="logo-title">Report</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="danger-btns">
                <div class="btn-danger">
                    <span>Download</span>
                </div>
                <div class="btn-danger">
                    <span>Logout</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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
    transition: all 0.5s ease-in-out 0s;
    z-index: 2;
    overflow: hidden auto;
}

.routelink-container {
    color: rgb(124, 124, 124);
    text-decoration: none;
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
    fill: currentcolor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
}
</style>