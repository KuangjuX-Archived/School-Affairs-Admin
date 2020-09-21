import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_URL,
        timeout: 50000
    })

    return instance(config)
}
