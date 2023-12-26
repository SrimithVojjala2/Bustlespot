<template>
    <div class="card-container" :class="{'active': id}">
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
        <p class="footer">
            Edit
        </p>
        |
        <p class="footer">
            Delete
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['organisation'],
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState(['activeOrgList']),
        id(){
            return this.organisation.organisationId === this.activeOrgList
        }
    }
}   
</script>

<style scoped>
.card-container {
    min-width: 350px;
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

.active{
    box-shadow: rgb(255, 87, 34) 1px 1px 18px;
}
</style>