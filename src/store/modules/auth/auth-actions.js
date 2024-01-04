import axios from 'axios'
import router from '@/router'
export default {
  async login(_, payload) {
    try {
      let userCredentials = payload
      let response = await axios.post(
        `
          https://bustlespot-api.gamzinn.com/api/auth/signin`,
        userCredentials
      )
      if (response.status === 200) {
        let postData = response.data.data;
        localStorage.setItem('jwtToken', postData.token)
        localStorage.setItem('UserInfo',JSON.stringify(postData))
        // const expiresIn = postData.expiresAt * 1000 - Date.now()
        // setTimeout(() => {
        //   localStorage.removeItem('jwtToken')
        // }, expiresIn)
        router.push('/organisation')
      }
    } catch (error) {
      console.error('Error in login:', error);
    }
  },
}
