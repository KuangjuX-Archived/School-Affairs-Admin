import { request } from "../network/request";

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
        url: "/admin/answer/add",
        method: "POST",
        data
    })
}


//通过问题获取标签
export function getTagByQuestion(data) {
    return request({
        url: "/admin/question/tagByQuestion",
        method: "GET",
        params: data
    })
}

//通过问题获取管理员回复
export function getAnswerByQuestion(data) {
    return request({
        url: "/user/question/get/answer",
        method: "GET",
        params: data
    })
}

//通过问题获取学生评价
export function getCommitByQuestion(data) {
    return request({
        url: "/user/question/get/commit",
        method: "GET",
        params: data
    })
}


//获得管理员已解决的问题
export function getSolvedQuestions(data) {
    return request({
        url: "/admin/question/solved",
        method: "GET",
        params: data
    })
}


//获得管理员未解决的问题
export function getUnsolvedQuestions(data) {
    return request({
        url: "/admin/question/unsolved",
        method: "GET",
        params: data
    })
}

//通过问题获取提问图片

export function getImageByQuestion(data) {
    return request({
        url: "/user/image/byQuestion",
        method: "GET",
        params: data
    })
}



