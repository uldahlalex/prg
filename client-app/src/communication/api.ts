import {Api} from "../../httpclient/Api.ts";
import {AxiosResponse} from "axios";
import {userAtom} from "../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {User} from "../types/user.ts";

export const http = new Api({
    baseURL: 'http://localhost:5000',
});

export function SetupHttpClient() {

    const [user, setUser] = useAtom<User | null>(userAtom);

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

//interceptor that checks if response code is 401 and if it is remove jwt
    http.instance.interceptors.response.use( (response) => {
        if(response.status === 401) {
            setUser(null);
            localStorage.removeItem('token');
        }

        return response;
    })
}
