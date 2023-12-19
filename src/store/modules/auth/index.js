import mutations from './auth-mutations';
import actions from './auth-actions';
import getters from './auth-getters';


export default {
    namespaced: true,
    state(){
        return{
            token: '',
            isPrimeNumber: null,
            isOganisationPresent:null,
        }
    },
    mutations,
    actions,
    getters,
};