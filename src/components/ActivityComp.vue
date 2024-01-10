<template>
  <el-loading
    v-loading.fullscreen.lock="loading"
    text="Loading..."
    background="rgba(255, 255, 255, 0.7)"
  >
    <header class="header-activity-container">
      <div class="header-activity-cards" v-if="activityDetails.length > 0">
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Hours</p>
          <p class="header-activity-card-details">
            {{ activityDetails[0].totalHours.substring(0, 5) }}
          </p>
        </div>
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Billable Hours</p>
          <p class="header-activity-card-details">
            {{ activityDetails[0].billingHours.substring(0, 5) }}
          </p>
        </div>
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Activity</p>
          <p class="header-activity-card-details">
            {{ activityDetails[0].activity.toFixed(0) + '%' }}
          </p>
        </div>
        <div class="header-activity-card1">
          <p class="header-activity-card-title">Total No of Users</p>
          <p class="header-activity-card-details">{{ activityDetails.length }}</p>
        </div>
      </div>
      <div class="header-activity-cards" v-else>
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Hours</p>
          <p class="header-activity-card-details">00:00</p>
        </div>
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Billable Hours</p>
          <p class="header-activity-card-details">00:00</p>
        </div>
        <div class="header-activity-card">
          <p class="header-activity-card-title">Total Activity</p>
          <p class="header-activity-card-details">0%</p>
        </div>
        <div class="header-activity-card1">
          <p class="header-activity-card-title">Total No of Users</p>
          <p class="header-activity-card-details">0</p>
        </div>
      </div>
    </header>

    <div class="activity-card-main-container">
      <div class="activity-card-container">
        <div class="activity-card">
          <el-card class="box-card" v-for="(user, index) in activityDetails" :key="index">
            <template #header>
              <div class="card-header">
                <div class="card-header-title-image-container">
                  <div class="card-header-image-container">
                    <img :src="user.profilePic" alt="" class="card-header-image" />
                  </div>
                  <p class="card-header-title">
                    {{ user.firstName + ' ' + user.lastName }}
                  </p>
                </div>
                <el-button class="btn-Screenshots" @click="handleChange(user)" text
                  >View Screenshots</el-button
                >
              </div>
            </template>
            <div class="grid-inner-container">
              <div class="grid-inner-item">
                <img src="../assets/images/AccessTimeFilledIcon.svg" class="grid-image" />
                <div class="grid-item-container">
                  <p class="grid-item-title">Total Hours</p>
                  <p class="grid-time-details">{{ user.totalHours.substring(0, 5) }}</p>
                </div>
              </div>
              <div class="grid-inner-item">
                <img src="../assets/images/ShowChartIcon.svg" class="grid-image" />
                <div class="grid-item-container">
                  <p class="grid-item-title">Activity</p>
                  <p class="grid-time-details">{{ user.activity.toFixed(0) + '%' }}</p>
                </div>
              </div>
              <div class="grid-inner-item">
                <img src="../assets/images/personFillIcon.svg" class="grid-image" />
                <div class="grid-item-container">
                  <p class="grid-item-title">No. of Projects</p>
                  <p class="grid-time-details">{{ user.projectCount }}</p>
                </div>
              </div>
              <div class="grid-inner-item">
                <img src="../assets/images/DateRangrIcon.svg" class="grid-image" />
                <div class="grid-item-container">
                  <p class="grid-item-title">Days worked</p>
                  <p class="grid-time-details">{{ user.workingDays+' ' }} {{user.workingDays===1 ? 'day' : 'days' }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </el-loading>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  emits: ['changeComp'],
  data() {
    return {
      activityDetails: [],
      loading: true
    }
  },
  computed: {
    ...mapState('activity', ['teamId', 'memberId', 'projectId', 'fromDate', 'toDate']),
    ...mapState(['activeOrgList'])
  },
  mounted() {
    this.getActivityDetails()
  },
  methods: {
    async getActivityDetails() {
      try {
        const token = localStorage.getItem('jwtToken')
        const projectId = this.projectId
        const teamId = this.teamId
        const memberId = this.memberId
        const organisationId = JSON.parse(localStorage.getItem('organisation')).organisationId
        const postDetails = {
          fromDate: `${this.fromDate}`,
          toDate: `${this.toDate}`,
          projectId,
          memberId,
          teamId,
          organisationId
        }
        let response = await axios.post(
          `https://bustlespot-api.gamzinn.com/api/activity/getActivityDetails`,
          postDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        if (response.status === 200) {
          this.activityDetails = response.data.data.activities
          this.loading = false
        }
      } catch (error) {
        console.error(error)
      }
    },
    handleChange(val) {
      this.$emit('changeComp', 'sstab', val)
      this.$router.push('#')
    }
  },
  watch: {
    teamId() {
      this.loading = true
      this.getActivityDetails()
    },
    memberId() {
      this.loading = true
      this.getActivityDetails()
    },
    projectId() {
      this.loading = true
      this.getActivityDetails()
    },
    fromDate() {
      this.loading = true
      this.getActivityDetails()
    },
    toDate() {
      this.loading = true
      this.getActivityDetails()
    },
    activeOrgList() {
      this.loading = true
      this.getActivityDetails()
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

.activity-card-main-container {
  padding: 0px 15px;
  margin-bottom: 20px;
}

.activity-card-container {
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  margin-top: -16px;
  width: calc(100% + 16px);
  justify-content: center;
}

.activity-card {
  padding-left: 16px;
  padding-top: 16px;
}

@media (min-width: 800px) {
  .activity-card-container {
    display: flex;
    box-sizing: border-box;
    flex-flow: wrap;
    margin-top: -16px;
    width: calc(100%+16px);
    justify-content: start;
  }
}

.box-card {
  box-shadow: rgb(195, 195, 195) 0px 3px 10px;
  border-radius: 10px;
  padding: 25px 20px;
  margin-bottom: 20px;
  height: inherit;
  width: 400px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
}

.card-header-title-image-container {
  display: flex;
  justify-content: space-between;
}

.card-header-image-container {
  box-shadow: grey 0px 0px 10px;
  border: 3px solid rgb(255, 255, 255);
  height: 60px;
  width: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
}

.card-header-image {
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: cover;
  color: transparent;
  text-indent: 10000px;
}

.card-header-title {
  margin-top: 20px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(105, 105, 105);
}

.btn-Screenshots {
  font-size: 13px;
  margin-bottom: 20px;
  text-decoration: none;
  margin-top: 10px;
  border-bottom: 2px dotted;
  width: 130px;
  text-align: center;
  color: #551a8b;
}

.grid-inner-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 4rem;
  margin-top: 2.3rem;
  margin-left: 16px;
}

.grid-inner-item {
  display: flex;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 10px;
}

.grid-image {
  padding: 2px 4px;
  color: rgb(255, 255, 255);
}

.grid-item-container {
  display: flex;
  flex-direction: column;
}
.grid-item-title {
  width: fit-content;
  margin-bottom: 3px;
}

.grid-time-details {
  width: fit-content;
  color: rgb(255, 93, 60);
}
</style>
