<template>
    <div class="container">
        <keep-alive>
            <div>
                <SideBar />
            </div>
        </keep-alive>
        <div class="section">
            <div>
                <HeaderBar/>
            </div>
            <div>
                <div>
                    <div v-if="isPrimeMember">
                        not in an organisation
                    </div>
                    <div v-if="isOganisationPresent" class="router-view">
                        <router-view v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" :key="$route.path" :userDetails="userDetails" />
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
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            userDetails: [],
            isPrimeMember: null,
            isOganisationPresent: null,
        }
    },
    components: { SideBar, HeaderBar },
    mounted() {
        this.getUserOrganisationDetails();
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
                    let data = response.data.data.organisationList;
                    this.setOrganisationList(data[0]);
                    let OrgDetails = { 'organisationId': data[0].organisationId };
                    localStorage.setItem('organisation', JSON.stringify(OrgDetails));
                    this.getUserDetails();
                } else {
                    console.error(`Request failed with status ${response.status}`);
                    return null;
                }
            } catch (error) {
                console.error('Error:', error.message);
                return null;
            }
        },
        async getUserDetails() {
            try {
                let token = localStorage.getItem('jwtToken');
                let organisationId = JSON.parse(localStorage.getItem('organisation'));
                let response = await axios.post('https://bustlespot-api.gamzinn.com/api/auth/userDetails', organisationId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    let data = response.data.data.user;
                    this.userDetails = data;
                } else {
                    // Handle other status codes if needed
                    console.error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error, e.g., show a user-friendly message
            }
        },
        ...mapMutations(['setOrganisationList'])
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

.router-view{
    width: 100%;
}
</style>