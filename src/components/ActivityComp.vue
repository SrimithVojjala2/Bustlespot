<template>
    <el-loading v-loading.fullscreen.lock="loading" text="Loading..." background="rgba(255, 255, 255, 0.7)">
        <header class="header-activity-container">
            <div class="header-activity-cards" v-if="activityDetails.length > 0">
                <div class="header-activity-card">
                    <p class="header-activity-card-title">Total Hours</p>
                    <p class="header-activity-card-details">{{ activityDetails[0].totalHours.substring(0, 5) }}</p>
                </div>
                <div class="header-activity-card">
                    <p class="header-activity-card-title">Total Billable Hours</p>
                    <p class="header-activity-card-details">{{ activityDetails[0].billingHours.substring(0, 5) }}</p>
                </div>
                <div class="header-activity-card">
                    <p class="header-activity-card-title">Total Activity</p>
                    <p class="header-activity-card-details">{{ (activityDetails[0].activity).toFixed(0) + '%' }}</p>
                </div>
                <div class="header-activity-card1">
                    <p class="header-activity-card-title">Total No of Users</p>
                    <p class="header-activity-card-details">{{ activityDetails.length }}</p>
                </div>
            </div>
        </header>
        
        
        <button @click="$emit('changeComp', 'sstab')">ejnjnkjaw</button>
    </el-loading>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    emits: ['changeComp'],
    data() {
        return {
            activityDetails: [],
            loading: true,
        }
    },
    computed: {
        ...mapState('activity', ['teamId', 'memberId', 'projectId', 'fromDate', 'toDate'])
    },
    mounted() {
        this.getActivityDetails();
    },
    methods: {
        async getActivityDetails() {
            try {
                const token = localStorage.getItem('jwtToken');
                const projectId = this.projectId;
                const teamId = this.teamId;
                const memberId = this.memberId;
                const organisationId = JSON.parse(localStorage.getItem('organisation')).organisationId;
                const postDetails = {
                    fromDate: `${this.fromDate}`,
                    toDate: `${this.toDate}`,
                    projectId,
                    memberId,
                    teamId,
                    organisationId
                };
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/activity/getActivityDetails`, postDetails, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });
                if (response.status === 200) {
                    this.activityDetails = response.data.data.activities;
                    this.loading=  false
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    },
    watch: {
        teamId() {
            this.loading = true;
            this.getActivityDetails();
        },
        memberId() {
            this.loading = true;
            this.getActivityDetails();
        },
        projectId() {
            this.loading = true;
            this.getActivityDetails();
        },
        fromDate() {
            this.loading = true;
            this.getActivityDetails();
        },
        toDate() {
            this.loading = true;
            this.getActivityDetails();
        }

    }
}
</script>

<style scoped>
.header-activity-container {
    padding: 0px 15px;
    margin-bottom: 20px;
}

.header-activity-cards {
    display: flex;
    background-color: white;
    border: 1px solid lightgray;
}

.header-activity-card {
    flex: 1 1 0%;
    margin: 15px;
    padding: 0px 15px;
    border-right: 1px solid rgb(204, 204, 204);
}

.header-activity-card1 {
    flex: 1 1 0%;
    margin: 15px;
    padding: 0px 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.header-activity-card-title {
    color: darkgray;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
}

.header-activity-card-details {
    color: rgb(129, 220, 160);
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
}
</style>