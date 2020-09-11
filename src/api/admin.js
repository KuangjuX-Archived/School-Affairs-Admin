import {request} from "../network/request";

export function login(data) {
    
    return request({
        url: "/admin/login",
        method: "GET",
        params: data
    })
}
export function logout(data) {
    return request({
        url: "/admin/logout",
        method: "get",
        params: data
    })
}