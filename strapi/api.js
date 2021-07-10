import axios from 'axios'
import {getEnvConfig} from "../config";

const currentEnvConfig = getEnvConfig();

const API_BASE_URL = currentEnvConfig.api.base
const API_ROOT = currentEnvConfig.api.root

const baseAPI = axios.create({
    baseURL: API_BASE_URL,
    timeout: 100000
})

const jsonAPI = axios.create({
    baseURL: API_BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const jsonRootApi = axios.create({
    baseURL: API_ROOT,
    timeout: 500000,
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

function buildAuthHeader(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token.jwt}`
        }
    }
}

export const BASE_API = {
    loginByCredentials(payload) {
        return jsonAPI.post('/auth/local', payload)
    },
    getProjects: (token) => {
        const config = buildAuthHeader(token);
        return baseAPI.get('/projects/', config)
    }
}

export const Api = {
    loginByCredentials(payload) {
        return jsonRootApi.post('/auth/local', payload)
    }
}