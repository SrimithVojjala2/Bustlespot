<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="main-container">
        <button v-if="active === 'sstab'" class="btn-back" @click="active = 'activity'"><el-icon>
                <Back />
            </el-icon></button>
        <p class="main-title">
            Activity
        </p>
        <div class="inputs-container">
            <div class="activity-input">
                <label class="activity-label">Select Date</label>
                <DatePicker @changeFromToDetails="changeFromToDetails" />
            </div>
            <div class="activity-input" v-if="isAdmin">
                <label class="activity-label">Select Team</label>
                <el-select v-model="teamId" filterable clearable placeholder="Select.." class="project-input" >
                    <el-option :value="1"/>
                </el-select>
            </div>
            <div class="activity-input">
                <label class="activity-label">Select Project</label>
                <el-select v-model="projectId" filterable clearable placeholder="Select.." class="project-input" >
                    <el-option v-for="project in projectList" :key="project.projectId" :label="project.name" :value="project.projectId" />
                </el-select>
            </div>
            <div class="activity-input">
                <label class="activity-label">Select Name</label>
                <el-select v-model="memberId" filterable multiple clearable placeholder="Select.." class="project-input" collapse-tags :max-collapse-tags="2" >
                    <el-option v-for="member in membersList" :key="member.userId" :label="member.firstName +' '+ member.lastName" :value="member.userId" />
                </el-select>
            </div>
        </div>
        <component :is="active" @changeComp="changeComp" />
    </div>
</template>

<script>
import activity from '@/components/ActivityComp.vue';
import sstab from '@/components/screenshotComp.vue';
import DatePicker from '@/components/datePicker.vue';
import { Back } from '@element-plus/icons-vue';
import { format, startOfDay } from 'date-fns';
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';

export default {
    components: { activity, sstab, Back, DatePicker },
    data() {
        const today = new Date();
        return {
            active: 'activity',
            fromToDetails: [format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss"),
            format(today, "yyyy-MM-dd'T'HH:mm:ss"),],
            projectId: null,
            memberId:[],
            teamId:null,
            teamsList:[],
            membersList:[],
            projectList:[]
        }
    },
    mounted(){
        this.getMemberList();
        this.getProjectList();
        // if(this.isAdmin){
        //     this.getTeamslist();
        // }
    },
    methods: {
        ...mapMutations('activity',['setFromToDate','setmemberId','setteamId','setprojectId']),
        changeComp(val) {
            this.active = val
        },
        changeFromToDetails(value) {
            this.fromToDetails = value;
            this.setFromToDate(value)
        },
        async getMemberList(){
            try{
                const token = localStorage.getItem('jwtToken');
                const projectId = this.projectId;
                const teamId = this.teamId;
                const organisationId = JSON.parse(localStorage.getItem('organisation')).organisationId;
                const postDetails = {
                    fromDate: `${this.fromToDetails[0]}`,
                    toDate: `${this.fromToDetails[1]}`,
                    projectId ,
                    teamId,
                    organisationId
                };
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/organisation/getMemberList`,postDetails,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });
                if(response.status===200){
                    this.membersList =response.data.data.userLists
                }
            }
            catch(error){
                console.error(error);
            }
        },
        async getProjectList(){
            try{
                const token = localStorage.getItem('jwtToken');
                const projectId = this.projectId;
                const teamId = this.teamId;
                const organisationId = JSON.parse(localStorage.getItem('organisation')).organisationId;
                const postDetails = {
                    fromDate: `${this.fromToDetails[0]}`,
                    toDate: `${this.fromToDetails[1]}`,
                    projectId ,
                    teamId,
                    organisationId
                };
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/project/getProjectList`,postDetails,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });
                if(response.status===200){
                    this.projectList =response.data.data.projectLists
                }
            }
            catch(error){
                console.error(error);
            }
        }
    },
    computed:{
        ...mapState(['roleId']),
        isAdmin(){
            return this.roleId === 1 || this.roleId ===2
        }
    },
    watch:{
        memberId(newval){
            this.setmemberId(newval)
        },
        teamId(newval){
            this.setteamId(newval)
        },
        projectId(newval){
            this.setprojectId(newval)
        }
    }
}
</script>

<style scoped>
.main-container {
    padding: 20px 20px 10px;
}

.btn-back{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    box-shadow: rgb(208, 208, 208) 0px 2px 9px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 10px 8px;
    cursor: pointer;
}

.main-title {
    color: dimgray;
    font-size: 20px;
    font-weight: bold;
    margin: 0px 0px 10px 10px;
}

.inputs-container {
    display: flex;
    margin-bottom: 30px;
}

.activity-input {
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
}

.activity-label {
    color: rgb(137, 137, 138);
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 5px;
}

.project-input{
    width: 200px;
}

.project-input .el-input{
    max-height: 40px;
}

</style>