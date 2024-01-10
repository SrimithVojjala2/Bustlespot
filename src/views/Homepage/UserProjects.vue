<template>
    <el-loading v-loading.fullscreen.lock="loading" text="Loading..." background="rgba(255, 255, 255, 0.7)">
        <div class="main-container">
            <div class="inner-container" v-show="UserProjectList.length > 0">
                <div class="title-container"></div>
                <div class="table-container">
                    <table class="table">
                        <thead class="table-head">
                            <tr class="table-head-data">
                                <th class="table-head-data-description"></th>
                                <th class="table-head-data-description">PROJECT NAME</th>
                                <th class="table-head-data-description">ROLE</th>
                                <th class="table-head-data-description">ORGANISATION</th>
                            </tr>
                        </thead>
                        <tbody class="table-body">
                            <tr class="table-body-row" v-for="(project, index) in UserProjectList" :key="index">
                                <td class="table-body-data1"></td>
                                <td class="table-body-data2">{{ project.projectName }}</td>
                                <td class="table-body-data2">{{ project.role }}</td>
                                <td class="table-body-data3">{{ project.organisationName }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-show="UserProjectList.length < 1" class="no-project-container">
                <img src="@/assets/images/no-projects.png" class="no-projects-image">
                <div class="no-projects-description">
                    <h2 class="no-projects-description1">You are not assigned in any projects!</h2>
                    <h5 class="no-projects-description2"></h5>
                </div>
            </div>
        </div>
    </el-loading>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    props: ['userInfo'],
    data() {
        return {
            UserProjectList: [],
            loading: true,
        }
    },
    mounted() {
        this.getUserProject();
    },
    computed:{
        ...mapState(['activeOrgList'])
    },
    methods: {
        async getUserProject() {
            try {
                const token = localStorage.getItem('jwtToken');
                const organsisationId = localStorage.getItem('organisation');
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/auth/getUserProject`, organsisationId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });
                if (response.status === 200) {
                    this.UserProjectList = response.data.data
                    this.loading = false;
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    },
    watch:{
        activeOrgList(){
            this.loading =true;
            this.getUserProject();
        }
    }
}
</script>

<style scoped>
.main-container {
    padding: 0px;
    height: calc(100% - 48px);
}

.inner-container {
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
    max-height: 100%;
    padding: 20px;
    overflow: auto;
}

.title-container {
    width: 100%;
    display: flex;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

.table {
    display: table;
    width: 100%;
    min-width: 650px;
    border-collapse: inherit;
    border-spacing: 3px 16px;
}

.table-head {
    display: table-header-group;
}

.table-head-data {
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
}

.table-head-data-description {
    line-height: 1.5rem;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    border-bottom: 1px none rgb(224, 224, 224);
    text-align: left;
    align-items: center;
    color: rgb(51, 51, 51);
    font-size: 13px;
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;
    font-weight: 600;
    text-transform: uppercase;
    padding: 5px;
    font-family: "Avenir Next LT Pro" !important;
}

.table-body {
    display: table-row-group;
}

.table-body-row {
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
}

.table-body-row:last-child td,
.table-body-row:last-child th {
    border: 0px solid;
}

.table-body-data1 {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
    align-items: center;
    background: white;
    font-family: "Avenir Next LT Pro" !important;
    box-shadow: rgb(233, 233, 233) 0px 8px 6px -6px, rgb(233, 233, 233) 0px -8px 6px -6px, rgb(233, 233, 233) -8px 0px 6px -5px !important;
}

.table-body-data2 {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: rgb(233, 233, 233) 0px 8px 6px -6px, rgb(233, 233, 233) 0px -8px 6px -6px;
    align-items: center;
    background: white;
    font-family: "Avenir Next LT Pro" !important;
}

.table-body-data3 {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: rgb(233, 233, 233) 0px 8px 6px -6px, rgb(233, 233, 233) 0px -8px 6px -6px, rgb(233, 233, 233) 8px 0px 6px -4px;
    align-items: center;
    background: white;
    font-family: "Avenir Next LT Pro" !important;
}

.no-project-container {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 50px;
}

.no-projects-image {
    width: 40%;
    height: 10%;
}

.no-projects-description{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.no-projects-description1{
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    margin: 20px 0px 0px 31px;
    font-size: 30px;
}

.no-projects-description2{
    margin: 10px 0px 10px 60px;
    font-size: 14px;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
}
h5 {
    display: block;
    font-size: 0.83em;
    margin-block-start: 1.67em;
    margin-block-end: 1.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
</style>