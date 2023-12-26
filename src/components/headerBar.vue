<template>
    <header class="header">
        <div class="container header-container">
            <div class="header-section1">
                <div class="header-section2">
                    <div class="profile-container">
                        <div class="profile-logo-container">
                            <div class="profile-logo" style="height: 35px;width: 35px;box-shadow: grey 0px 0px 10px;">
                                S
                            </div>
                        </div>
                        <button class="organisation-container">
                            <div class="org-container-inside" @click="showOrganisationPopupChange(!showOrganisationPopup)">
                                <div class="organisation-photo">
                                    <img :src="organisationList[activeOrg].image" alt="noPhoto" class="image">
                                </div>
                                <p class="organisation-name">
                                    {{ organisationList[activeOrg].name }}
                                </p>
                            </div>
                            <span v-if="showOrganisationPopup" class="popup">
                                <div class="popup-container" v-for="(organisation, index) in organisationList" :key="index"
                                    @click="handleOrgList(index, organisation)">
                                    <div class="organisation-photo">
                                        <img :src="organisation.image" alt="noPhoto" class="image">
                                    </div>
                                    <p class="organisation-name">
                                        {{ organisation.name }}
                                    </p>
                                </div>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios';
export default {
    data() {
        return {
            activeOrg: 0,
            organisationList: [0],
            userDetails: [],
        }
    },
    mounted() {
        this.getUserOrganisationDetails();
    },
    computed: {
        ...mapState(['showOrganisationPopup', 'activeOrgList'])
    },
    methods: {
        ...mapMutations(['showOrganisationPopupChange', 'setOrganisationList', 'activeOrgListChange']),
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
                    this.organisationList = data;
                    this.setOrganisationList(this.organisationList);
                    if (!localStorage.getItem("organisation")) {
                        let OrgDetails = { 'organisationId': data[0].organisationId };
                        localStorage.setItem('organisation', JSON.stringify(OrgDetails));
                        this.activeOrgListChange(data[0].organisationId)
                    }else{
                        this.activeOrg = this.organisationList.findIndex(org => org.organisationId === JSON.parse(localStorage.getItem('organisation')).organisationId);
                    }
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
                    this.userDetails = data[0];
                } else {
                    // Handle other status codes if needed
                    console.error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error, e.g., show a user-friendly message
            }
        },
        handleOrgList(index, organisation) {
            this.activeOrg = index;
            localStorage.removeItem('organisation');
            let OrgDetails = { 'organisationId': organisation.organisationId };
            localStorage.setItem('organisation', JSON.stringify(OrgDetails));
            this.activeOrgListChange(organisation.organisationId);
        }
    }

}
</script>

<style scoped>
.header {
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    color: rgb(255, 255, 255);
    height: 50px;
    position: sticky;
    top: 0px;
    background-color: white;
    z-index: 1;
    border-bottom: 1px solid rgb(223, 223, 223);
    box-shadow: none;
    width: 100%;
}

.container {
    min-width: 100%;
}

.header-container {
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
}

@media(min-width: 600px) {
    .header-container {
        padding-left: 24px;
        padding-right: 24px;
    }
}

@media (min-width: 600px) {
    .header-section1 {
        min-height: 50px;
        max-height: 50px;
    }
}

.header-section1 {
    position: relative;
    display: flex;
    align-items: center;
}

.header-section2 {
    flex-grow: 3;
    text-align: right;
}

.profile-container {
    display: flex;
    flex-flow: wrap;
    justify-content: end;
}

.profile-logo-container {
    border-radius: 4px;
    display: flex;
    padding: 12px 16px;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;
}

.profile-logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
    user-select: none;
    color: rgb(255, 255, 255);
    background-color: rgb(189, 189, 189);
}

.organisation-photo {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
    user-select: none;
    height: 35px;
    width: 35px;
}

.image {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
    color: transparent;
    text-indent: 10000px;
}

.organisation-container {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    font-size: 1.5rem;
    overflow: visible;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.54);
    transition: 150ms 0ms;
    transition-timing-function: linear;
    padding: 0px;
}

.org-container-inside {
    display: flex;
    align-items: center;
    justify-content: center;
}

.org-container-inside:active {
    background-color: rgba(189, 189, 189, 0.24);
    border-radius: 50%;
}

.organisation-name {
    margin: 0px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.54);
    padding-left: 5px;
    font-family: "Avenir Next LT Pro" !important;
}

.popup {
    overflow: hidden;
    position: absolute;
    z-index: 1;
    left: auto;
    margin-right: 40px;
    top: 50px;
    background-color: white;
    padding: 10px;
    box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.popup .popup-container {
    padding: 10px;
    display: flex;
    align-items: center;
}

.popup-container:hover {
    background-color: rgba(222, 184, 135, 0.397);
    border-radius: 5px;
}
</style>