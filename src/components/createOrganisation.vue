<template>
    <div class="createOrg-container">
        <button class="btn-back" @click="$emit('changecurrentComp', 'organisationComp')">
            <el-icon color="black" :size="17">
                <Back />
            </el-icon>
        </button>
        <div class="form-container">
            <form class="formOrganisation">
                <div class="orgDescription">Organization Details</div>
                <div class="org-inputs-container">
                    <div class="org-name-details-container">
                        <TextInput label="Organization Name*" type="text" v-model="orgName" class="org-input"
                            placeholder="Enter your organization name">
                            <template #icon>
                                <el-icon color="rgb(210, 210, 210)" class="org-icon" :size="16">
                                    <OfficeBuilding />
                                </el-icon>
                            </template>
                            <template #error>
                                <span v-if="orgNameError">Please enter your organization name </span>
                                <span v-if="orgNameExists">Organisation name is already exist </span>
                            </template>
                        </TextInput>
                        <TextArea type="text" v-model="orgDescription" placeholder="Enter your organization description"
                            label="Organization Description*" class="org-textarea">
                          <template #icon>
                            <el-icon class="org-icon" :size="16" color="rgb(210, 210, 210)"
                              ><Document
                            /></el-icon>
                          </template>
                          <template #error>
                            <span v-if="orgDescriptionError"
                              >Please enter Description of your organization
                            </span>
                          </template>
                        </TextArea>
                    </div>
                    <div style="width: 50%;">
                        <div class="org-logo-container">
                            <label style="color: darkgray;font-size: 12px;">Organisation Logo *</label>
                            <input type="file" accept="image/png, image/jpeg" class="org-logo-input">
                            <div class="org-logo">
                                <el-icon size="38px" style="width: 1em;height: 1em;font-size: 2.1875rem;" color="rgb(210,210,210)"><upload-filled /></el-icon>
                                <div class="org-logo-description" style="color: rgb(210,210,210)">Upload Logo</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-submit"> submit </button>
            </form>
        </div>
    </div>
</template>

<script>
import { Back, OfficeBuilding, Document,UploadFilled } from '@element-plus/icons-vue'
import TextArea from '@/components/TextAreaInput.vue'
import TextInput from './TextInput.vue'
import axios from 'axios'
export default {
    emits: ['changecurrentComp'],
    components: { Back, TextInput, OfficeBuilding, TextArea, Document,UploadFilled },
    data() {
        return {
            orgName: '',
            orgDescription: '',
            orgDescriptionError: false,
            orgNameExists: false,
            orgNameError: false
        }
    },
    watch: {
        orgDescription(newval) {
            if (newval === '') {
                this.orgDescriptionError = true
            } else {
                this.orgDescriptionError = false
            }
        },
        orgName(newval) {
            if (newval === '') {
                this.orgNameError = true
            } else {
                this.orgNameError = false
                this.isOrganisationExist(newval)
            }
        }
    },
    methods: {
        async isOrganisationExist(payload) {
            let token = localStorage.getItem('jwtToken')
            let response = await axios.post(
                `https://bustlespot-api.gamzinn.com/api/organisation/isOrganisationExist`,
                { organisationName: `${payload}` },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.status === 200) {
                let data = response.data.data
                this.orgNameExists = data.organisationExist
            }
        }
    }
}
</script>

<style>
.createOrg-container {
    height: calc(100vh - 50px);
    overflow-y: auto;
    padding: 20px;
}

.btn-back {
    position: relative;
    box-sizing: border-box;
    outline: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 6px 16px;
    transition:
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(255, 255, 255);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    box-shadow: rgb(208, 208, 208) 0px 2px 9px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 25px;
    font-family: 'Avenir Next LT Pro' !important;
}

.form-container {
    width: 100%;
}

.form-container .formOrganisation {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.formOrganisation .orgDescription {
    padding: 10px;
    margin: 60px 0px 0px;
    color: rgb(51, 51, 51);
    font-size: 14px;
    text-transform: capitalize;
}

.formOrganisation .org-inputs-container {
    display: flex;
    justify-content: space-around;
    padding-inline: 15px;
    width: 80%;
}

.org-name-details-container {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.org-input {
    margin-top: 4px;
    margin-bottom: 0px;
    padding: 10px 5px;
}

.inner-container {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    min-width: 0px;
    padding: 0px;
    margin: 16px 0px 8px;
    border: 0px;
    vertical-align: top;
    width: 100%;
}

.input-icon-container {
    border: none;
    background-color: rgb(249, 249, 249);
    border-radius: 0px;
    color: rgb(141, 141, 141);
    font-size: 12px;
}

.input {
    color: rgb(141, 141, 141);
    font-weight: 400;
}

.label {
    color: #a9a9a9;
}

.org-icon {
    font-size: 24px;
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    flex-shrink: 0;
    font-size: 1rem;
}

.org-textarea {
    border: none;
    border-radius: 0px;
    color: rgb(141, 141, 141);
    font-size: 12px;
    align-items: flex-start;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    width: 100%;
    position: relative;
    font-family: 'Avenir Next LT Pro' !important;
}

.btn-submit {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: rgb(255, 93, 59);
    color: white;
    padding: 10px 15px;
    width: 400px;
    border: none;
    border-radius: 40px;
    height: 45px;
    margin: 40px 0px 8px;
    font-size: 18px;
    text-transform: uppercase;
    font-family: "Avenir Next LT Pro" !important;
}

.btn-submit:hover {
    text-decoration: none;
    background-color: rgb(169, 42, 52);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
}

.org-logo-container {
    width: 100%;
    padding: 0px 15px;
}

.org-logo-input{
    visibility: hidden !important;
}

.org-logo{
    border: 1px dashed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 215px;
    cursor: pointer;
    margin-top:2px;
}


</style>
