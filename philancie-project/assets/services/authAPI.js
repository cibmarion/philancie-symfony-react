import axios from 'axios';
import jwtDecode from "jwt-decode"

function logout(credentials){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials){
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);
        })
}

function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp: expiration} = jwtDecode(token);
        const date = new Date().getTime()/1000;
        if(expiration > date){
            setAxiosToken(token);
        } else {
            logout();
        }
    } else {
        logout();
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp: expiration} = jwtDecode(token);
        const date = new Date().getTime()/1000;
        if(expiration > date){
            return true;
        } 
        return false;
    } 
    return false;
}


export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}