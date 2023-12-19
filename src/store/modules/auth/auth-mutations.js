
export default {
    setToken(state,payload){
        state.token = payload.token;
        state.isPrimeNumber = payload.isPrimeNumber;
        state.isOganisationPresent = payload.isOganisationPresent;
        localStorage.setItem('jwtToken',payload.token);
        const expiresIn = payload.expiresAt * 1000 - Date.now();
        setTimeout(() => {
            localStorage.removeItem('jwtToken');
          }, expiresIn);
    },
}