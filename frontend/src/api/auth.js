import apiRequest from "./client";

async function login(username, password){
    const data = await apiRequest("/login", {
        method: "POST", 
        body: JSON.stringify({ username, password })
    });
    setToken(data.token);
    return data;

}

async function signup(username, password, confirmPassword, name){
    const data = await apiRequest("/signup", {
        method: "POST",
        body: JSON.stringify({ username, password, confirmPassword, name })
    });
    return data;
}

function setToken(token){
    localStorage.setItem("token", token);
}

function getToken(){
    return localStorage.getItem("token");
}

function removeToken(){
    localStorage.removeItem("token");
}

export { login, signup, setToken, getToken, removeToken };