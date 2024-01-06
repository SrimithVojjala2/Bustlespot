import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

export default {
  async login(_, payload) {
    try {
      let userCredentials = payload
      let response = await axios.post(
        'https://bustlespot-api.gamzinn.com/api/auth/signin',
        userCredentials
      )

      if (response.status === 200) {
        let postData = response.data.data;
        localStorage.setItem('jwtToken', postData.token)
        localStorage.setItem('UserInfo', JSON.stringify(postData))
        // Redirect to '/organisation' route after successful login
        router.push('/organisation')
      }

    } catch (error) {
      // Handle authentication errors
      if (error.response && error.response.status === 401) {
        ElMessage({
          showClose: true,
          message: `${error.response.data.message}`,
          type: 'error',
          offset: 680
        })
      }
      if (error.response && error.response.status === 400) {
        ElMessage({
          showClose: true,
          message: `${error.response.data.message}`,
          type: 'error',
          offset: 680
        })
      } else {
        console.error('Unexpected error:', error);
      }
    }
  },
}
