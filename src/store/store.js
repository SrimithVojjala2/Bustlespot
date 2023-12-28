import { createStore } from 'vuex'
import authModule from './modules/auth'
import axios from 'axios'
const store = createStore({
  state() {
    return {
      showOrganisationPopup: false,
      invitations: [],
      organisationList: [],
      showActions: false,
      activeOrgList: null,
      roleId: null
    }
  },
  mutations: {
    showOrganisationPopupChange(state, payload) {
      state.showOrganisationPopup = payload
    },
    setInvitations(state, payload) {
      state.invitations = payload
    },
    setOrganisationList(state, payload) {
      state.organisationList = payload
    },
    showActionschange(state, payload) {
      state.showActions = payload
    },
    activeOrgListChange(state, payload) {
      state.activeOrgList = payload
    },
    setroleId(state, payload) {
      state.roleId = payload
    }
  },
  actions: {
    async getUserInvitaion({ commit }) {
      try {
        let token = localStorage.getItem('jwtToken')
        let response = await axios.post(
          'https://bustlespot-api.gamzinn.com/api/auth/getUserInvitaion',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          let data = response.data.data.data
          commit('setInvitations', data)
        } else {
          // Handle other status codes if needed
          console.error('Request failed with status:', response.status)
        }
      } catch (error) {
        console.error('Error:', error.message)
        // Handle error, e.g., show a user-friendly message
      }
    },
  },
  getters: {
    adminlist: (state) => {
      return state.organisationList.filter((org) => org.roleId === 1)
    },
    userList: (state) => {
      return state.organisationList.filter((org) => org.roleId === 4)
    }
  },
  modules: {
    auth: authModule
  }
})

export default store
