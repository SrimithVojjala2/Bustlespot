import { format, startOfDay } from 'date-fns';
export default {
    namespaced: true,
    state(){
        const today = new Date();
        return{
            fromDate: format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss"),
            toDate:format(today, "yyyy-MM-dd'T'HH:mm:ss"),
            memberId:[],
            teamId:null,
            projectId: null,
        }
    },
    mutations:{
        setFromToDate(state,payload){
            state.fromDate = payload[0]
            state.toDate = payload[1]
        },
        setmemberId(state,payload){
            state.memberId = payload
        },
        setteamId(state,payload){
            state.teamId = payload
        },
        setprojectId(state,payload){
            state.projectId = payload
        }
    }
};