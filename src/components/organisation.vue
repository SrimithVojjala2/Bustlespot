<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="main-container">
        <div class="admin-org-container" v-if="adminlist.length>0">
            <div class="header-admin-org-container">
                <p class="admin-org-title">
                    Administrative Organizations
                </p>
                <p class="admin-create-org admin-org-title" @click="$emit('changecurrentComp','createOrgComp')">
                    + Create New Organization
                </p>
            </div>
            <div class="main-admin-org-card-container">
                <div class="main-admin-org-card-container-inside" v-for="(organisation, index) in adminlist" :key="index">
                    <orgCard :organisation="organisation" />
                </div>
            </div>
        </div>
        <div class="admin-org-container non-admin-org" v-if="userList.length > 0">
            <div class="header-admin-org-container">
                <p class="admin-org-title">
                    Non-Administrative Organizations
                </p>
                <p class="admin-create-org admin-org-title" v-if="adminlist.length <= 0" @click="$emit('changecurrentComp','createOrgComp')">
                    + Create New Organization
                </p>
            </div>
            <div class="main-admin-org-card-container">
                <div class="main-admin-org-card-container-inside" v-for="(organisation, index) in userList" :key="index">
                    <orgCard :organisation="organisation" />
                </div>
            </div>
        </div>
        <div class="admin-org-container pending-invitaions" >
            <div class="header-admin-org-container" >
                <p class="admin-org-title">
                    Pending invitations
                </p>
            </div>
            <div class="invitation-container" >
                <div class="inner-invitations-container" v-if="invitations.length > 0">
                    <div class="title-container"></div>
                    <div class="inner-invitation-container">
                        <table class="invitation-table">
                            <thead class="invitation-head">
                                <tr class="invitation-head-row">
                                    <th class="invitation-head-row-heading" scope="col"></th>
                                    <th class="invitation-head-row-heading" scope="col">INVITED BY</th>
                                    <th class="invitation-head-row-heading" scope="col">ORGANIZATION</th>
                                    <th class="invitation-head-row-heading" scope="col">ROLE</th>
                                    <th class="invitation-head-row-heading" scope="col">INVITED ON</th>
                                    <th class="invitation-head-row-heading" scope="col">ACTION(S)</th>
                                </tr>
                            </thead>
                            <tbody class="tbody" v-for="(invitation, index) in invitations" :key="index">
                                <tr class="inner-container">
                                    <td class="empty-td"></td>
                                    <td class="inner-description" scope="row">{{ invitation.inviteeName }}</td>
                                    <td class="inner-description" scope="row">{{ invitation.organisationName }}</td>
                                    <td class="inner-description" scope="row">{{ invitation.role }}</td>
                                    <td class="inner-description" scope="row">{{ invitation.sentDate.slice(8, 10) }}/{{
                                        invitation.sentDate.slice(5, 7) }}/{{ invitation.sentDate.slice(0, 4) }}</td>
                                    <td class="inner-description-2">
                                        <div>
                                            <div class="btn-action">
                                                <div @click="showActionschange(!showActions)">
                                                    <span class="material-symbols-outlined img">
                                                        more_vert
                                                    </span>
                                                </div>
                                                <div class="actions-popup" v-if="showActions">
                                                    <div class="actions-description">
                                                        Accept
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="empty-pending-list">
                    <h2>You do not have any pending Invitations!</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import orgCard from "@/components/organisationCard.vue";
export default {
    components: { orgCard },
    emits:['changecurrentComp'],
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['invitations', 'organisationList', 'showActions','activeOrgList']),
        ...mapGetters(['adminlist', 'userList'])
    },
    mounted() {
        this.getUserInvitaion();
        if(JSON.parse(localStorage.getItem('organisation'))){
            this.activeOrgListChange(JSON.parse(localStorage.getItem('organisation')).organisationId)
        }
    },
    methods: {
        ...mapActions(['getUserInvitaion']),
        ...mapMutations(['showActionschange','activeOrgListChange'])
    }
}
</script>

<style scoped>
.main-container {
    height: calc(100vh - 50px);
    overflow-y: auto;
    padding: 20px;
}

.admin-org-container {
    padding: 20px;
    box-shadow: rgba(200, 200, 200, 0.9) 0px 0px 10px;
    border-radius: 10px;
}

.admin-org-container .header-admin-org-container {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 1rem 2rem;
    padding: 1rem 0px;
}

.admin-org-container .main-admin-org-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin: 2rem 2rem 1rem;
}


@media (max-width: 1100px) {
    .admin-org-container .main-admin-org-card-container {
        grid-template-columns: 1fr 1fr;
    }
}

.admin-org-title {
    font-size: 16px;
    font-weight: 600;
}

.header-admin-org-container .admin-create-org {
    cursor: pointer;
    width: fit-content;
}

.header-admin-org-container .admin-create-org:hover {
    color: rgb(255, 87, 34);
}

p {
    display: block;
    margin-block-end: 0.5em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.main-admin-org-card-container-inside {
    display: grid;
    grid-template-rows: 2fr 0.5fr;
    gap: 0.5rem;
}

.invitation-container {
    display: grid;
    gap: 2rem;
    margin: 2rem 2rem 1rem;
}

.inner-invitations-container {
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

.inner-invitation-container {
    width: 100%;
    overflow-x: auto;
}

.invitation-table {
    display: table;
    width: 100%;
    min-width: 650px;
    border-collapse: inherit;
    border-spacing: 3px 16px;
}

.invitation-head {
    display: table-header-group;
}

.invitation-head thead {
    vertical-align: middle;
    border-color: inherit;
}

.invitation-head-row {
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
}

.invitation-head-row-heading {
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

.tbody {
    display: table-row-group;
}

.tbody tbody {
    vertical-align: middle;
}

.inner-container {
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
}

.empty-td {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
    -webkit-font-smoothing: antialiased;
    -webkit-box-align: center;
    align-items: center;
    background: white;
    font-family: "Avenir Next LT Pro" !important;
    box-shadow: rgb(233, 233, 233) 0px 8px 6px -6px, rgb(233, 233, 233) 0px -8px 6px -6px, rgb(233, 233, 233) -8px 0px 6px -5px !important;
}

.inner-description {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
    -webkit-font-smoothing: antialiased;
    box-shadow: rgb(233, 233, 233) 0px 8px 6px -6px, rgb(233, 233, 233) 0px -8px 6px -6px;
    -webkit-box-align: center;
    align-items: center;
    background: white;
    font-family: "Avenir Next LT Pro" !important;
}

.inner-description-2 {
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

.btn-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    flex: 0 0 auto;
    color: rgba(0, 0, 0, 0.54);
    padding: 5px;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 50%;
}

.img {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentcolor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.material-symbols-outlined {
    pointer-events: none;
    font-size: 23px;
    z-index: 0;
    inset: 0px;
    border-radius: inherit;
}

.actions-popup {
    position: absolute;
    top: 70%;
    left: -15px;
    z-index: 1;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 4px;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    padding: 5px;
    min-width: 90px;
}

.actions-popup .actions-description {
    margin: 0;
    padding: 8px 0;
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.empty-pending-list{
    display: grid;
    gap: 2rem;
    margin: 2rem 2rem 1rem;
}

.empty-pending-list h2{
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    text-align: center;
    font-size: 25px;
}
</style>