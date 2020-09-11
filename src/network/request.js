import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: "http://47.93.253.240:10805/api",
        timeout: 50000
    })

    return instance(config)
}
