<template>
    <div class="container">
        <div>
            <keep-alive>
                <SideBar :isOganisationPresent="isOganisationPresent"/>
            </keep-alive>
        </div>
        <div class="section">
            <div>
                <keep-alive>
                    <HeaderBar :organisationList="organisationList" />
                </keep-alive>
            </div>
            <div>
                <div>
                    <div v-if="isPrimeMember">
                        not in an organisation
                        <div @click="is">click me</div>
                    </div>
                    <div v-if="isOganisationPresent">
                        <router-view :key="$route.fullPath">
                        </router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SidebarComp.vue';
import HeaderBar from '@/components/headerBar.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            organisationList: [],
            isPrimeMember:null,
            isOganisationPresent:null,
        }
    },
    components: { SideBar, HeaderBar },
    created() {
        this.getUserOrganisationDetails();
        this.isPrimeMember=JSON.parse(localStorage.getItem('UserInfo')).isPrimeMember;
        this.isOganisationPresent=JSON.parse(localStorage.getItem('UserInfo')).isOganisationPresent;
    },
    methods: {
        async getUserOrganisationDetails() {
            try {
                let token = localStorage.getItem('jwtToken');
                const response = await axios.get('https://bustlespot-api.gamzinn.com/api/organisation/getUserOrganization', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    let data = response.data.data.organisationList[0];
                    this.organisationList = data;
                    let OrgDetails= {'organisationId':data.organisationId};
                    localStorage.setItem('organisation', JSON.stringify(OrgDetails));
                } else {
                    console.error(`Request failed with status ${response.status}`);
                    return null;
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }
        },
        ...mapActions('auth', ['setOrganisationList'])
    },
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
}

.section {
    width: 100%;
}
</style>