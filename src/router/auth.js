const isLoggedIn = () => {
    const authToken = localStorage.getItem('jwtToken')
    return authToken !== null && authToken !== undefined
}

export default isLoggedIn;