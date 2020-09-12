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
        method: "GET",
        params: data
    })
}

export function changePhoneNumber(data) {
    return request({
        url: "/admin/setPhoneNumber",
        method: "POST",
        data
    })
}

export function changePassword(data) {
    return request({
        url: "/admin/setPassword",
        method: "POST",
        data
    })
}

export function getTags(data) {
    return request({
        url: "/admin/tag/mission",
        method: "GET",
        params: data
    })
}

export function getQuestionsByTag(data) {
    return request({
        url: "/admin/tag/question",
        method: "GET",
        params: data
    })
}
