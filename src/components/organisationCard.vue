<template>
    <div class="card-container" :class="{ 'active': id }">
        <div class="image-container">
            <div class="image" style="box-shadow: grey 0px 0px 10px">
                <img :src="organisation.image" alt="image" class="img" />
            </div>
        </div>
        <div class="org-details-container">
            <p class="org-name">{{ organisation.name }}</p>
            <div class="org-admin-container">
                <img src="../assets/images/active.svg" alt="" class="admin-icon icon">
                {{ organisation.role }}
            </div>
            <p class="org-description">{{ organisation.description }}</p>
        </div>
    </div>
    <div class="footer-section" v-if="organisation.roleId === 1">
        <p class="footer" @click="handleChangecomponent(organisation)">
            Edit
        </p>
        |
        <p class="footer" @click="Deletepopuphandle">
            Delete
        </p>
    </div>
    <div>
        <el-dialog v-model="Deletepopup" title="Delete" width="450px" align-center :show-close="false">
            <span class="dialog-description">Are you sure you want to remove the organization ?</span>
            <template #footer>
                <span>
                    <el-button @click="Deletepopup = false" class="dialog-btn">No</el-button>
                    <el-button type="primary" @click="DeleteOrg(organisation.organisationId)" class="dialog-btn">
                        Yes
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import { ElMessage } from 'element-plus'
export default {
    props: ['organisation'],
    emits:['changecurrentComp'],
    data() {
        return {
            Deletepopup: false,
        }
    },
    computed: {
        ...mapState(['activeOrgList']),
        id() {
            return this.organisation.organisationId === this.activeOrgList
        }
    },
    methods: {
        ...mapMutations(['seteditOrgDetails']),
        Deletepopuphandle() {
            if (this.activeOrgList !== this.organisation.organisationId) {
                this.Deletepopup = true
            }
            else {
                ElMessage({
                    showClose: true,
                    message: 'You can not delete the active organization',
                    type: 'error',
                    offset: 680
                })
            }
        },
        async DeleteOrg(Id) {
            try {
                let token = localStorage.getItem('jwtToken');
                let response = await axios.post(`https://bustlespot-api.gamzinn.com/api/organisation/deleteOrganisation`, {
                    organisationId: `${Id}`
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                });

                if (response.status === 200) {
                    this.Deletepopup = false;
                    this.$router.go(0);
                }
            }
            catch (error) {
                console.error(error);
            }
        },
        handleChangecomponent(val) {
            this.seteditOrgDetails(val)
            this.$emit('changecurrentComp', 'editOrganization')
        }
    }
}   
</script>

<style scoped>
.card-container {
    display: flex;
    gap: 1rem;
    box-shadow: rgba(200, 200, 200, 0.9) 0px 0px 10px;
    padding: 1.5rem 1rem;
    border-radius: 8px;
}

.footer-section {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.footer {
    font-size: 14px;
    font-weight: 600;
}

.image-container {
    margin-top: 0.4rem;
}

.image {
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
}

.img img {
    height: 40px;
    width: 40px;
    box-shadow: grey 0px 0px 10
}

.img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
    color: transparent;
    text-indent: 10000px;
}

.org-details-container {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 0.4rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.org-name {
    font-size: 18px;
    font-weight: 600;
    padding: 2px 0px;
}

.org-admin-container {
    display: flex;
    gap: 4px;
    font-size: 16px;
    margin-top: 0.2em;
}

.icon {
    font-size: 10px;
    margin-top: 4px;
}

.admin-icon {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50%;
}

.org-description {
    font-size: 14px;
    margin-top: 0.2em;
}

.footer:hover {
    cursor: pointer;
    color: rgb(255, 87, 34);
}

.active {
    box-shadow: rgb(255, 87, 34) 1px 1px 18px;
}

.dialog-description {
    font-size: 16px;
}

.dialog-btn {
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
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    min-width: 64px;
    padding: 6px 16px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    color: rgb(255, 255, 255);
    border: none;
    outline: none;
    font-size: 12px;
    border-radius: 5px;
    background-color: rgb(255, 93, 59);
    margin: 5px;
    text-transform: capitalize;
    font-family: "Avenir Next LT Pro" !important;
}

.dialog-btn:hover {
    color: white;
    text-decoration: none;
    background-color: rgb(169, 42, 52);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
}
</style>