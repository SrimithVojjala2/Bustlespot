<template>
    <div class="container">
        <keep-alive>
            <div>
                <SideBar />
            </div>
        </keep-alive>
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
                    </div>
                    <div v-if="isOganisationPresent">
                        <router-view v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" :key="$route.path" :userDetails="userDetails"/>
                            </keep-alive>
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

export default {
    data() {
        return {
            organisationList: [],
            userDetails: [],
            isPrimeMember: null,
            isOganisationPresent: null,
        }
    },
    components: { SideBar, HeaderBar },
    created() {
        this.getUserOrganisationDetails();
        this.getUserDetails();
        this.isPrimeMember = JSON.parse(localStorage.getItem('UserInfo')).isPrimeMember;
        this.isOganisationPresent = JSON.parse(localStorage.getItem('UserInfo')).isOganisationPresent;
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
                    let OrgDetails = { 'organisationId': data.organisationId };
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
        async getUserDetails() {
            try {
                let token = localStorage.getItem('jwtToken');
                let organisationId = localStorage.getItem('organisation');
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/auth/userDetails`, organisationId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });

                if (response.status === 200) {
                    let data = response.data.data.user
                    this.userDetails = data
                }
            } catch (error) {
                console.error('Error during request:', error);
                throw error;
            }
        }
    }
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