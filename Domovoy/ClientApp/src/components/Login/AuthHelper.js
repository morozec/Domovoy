export default{
    saveAuth:(userName, token) => {       
        sessionStorage.setItem(window.constants.tokenKey, JSON.stringify({userName:userName, access_token: token}))
    },

    clearAuth: () => {
        sessionStorage.removeItem(window.constants.tokenKey)
    },

    getLogin: () => {
        let item = sessionStorage.getItem(window.constants.tokenKey);
        let login = ''
        if (item){
            login = JSON.parse(item).userName
        }
        return login
    },

    isLogged: () => {
        let item = sessionStorage.getItem(window.constants.tokenKey)
        return item ? true : false
    },

    getToken : () => {
        let item  = sessionStorage.getItem(window.constants.tokenKey)
        let token = null
        if (item){
            token = JSON.parse(item).access_token
        }
        return token
    }
}