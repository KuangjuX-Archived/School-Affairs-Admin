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

export function addTag(data) {
    return request({
        url: "/admin/tag/add",
        method: "POST",
        data
    })
}

export function removeTag(data) {
    return request({
        url: "/admin/tag/delete",
        method: "POST",
        data
    })
}


export function removeTagByQuestion(data) {
    return request({
        url: "/admin/question/delete/tag",
        method: "POST",
        data
    })
}

export function removeQuestion(data) {
    return request({
        url: "/admin/question/delete/question",
        method: "POST",
        data
    })
}


export function addQuestionTag(data) {
    return request({
        url: "/admin/question/add/tag",
        method: "POST",
        data
    })
}


export function addComment(data) {
    return request({
        url : "/admin/answer/add",
        method: "POST",
        data
    })
}


export function getTagByQuestion(data) {
    return request({
        url: "/admin/question/tagByQuestion",
        method: "GET",
        params: data
    })
}


