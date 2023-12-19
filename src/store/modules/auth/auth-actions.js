import axios from "axios";
import router from '@/router'; 
export default {
    async login({commit},payload){
        let userCredentials = payload;
        let response = await axios.post(`
        https://bustlespot-api.gamzinn.com/api/auth/signin`,userCredentials);

        if(response.status === 200){
            let postData = response.data.data;
            commit('setToken',postData);
            router.push({name:'home'})
        }
    },
}