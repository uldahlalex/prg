import {Api} from "../../httpclient/Api.ts";

export const http = new Api({
    baseURL: 'http://localhost:5000',
});
http.instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token') || '';
    return config;
});