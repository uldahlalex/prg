import {Api} from "../../httpclient/Api.ts";

export const http = new Api({
    baseURL: 'http://localhost:5000',
});
http.instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token') || '';
    if (config.params) {
        let params = new URLSearchParams();

        // Iterate over all parameters
        Object.keys(config.params).forEach(key => {
            if (Array.isArray(config.params[key])) {
                // For each item in an array, add it under the same key
                config.params[key].forEach((item: any) => {
                    params.append(key, item);
                });
            } else {
                // For non-array params, add them normally
                params.append(key, config.params[key]);
            }
        });

        // Override the original params with our modified version
        config.params = params;
    }
    return config;
});