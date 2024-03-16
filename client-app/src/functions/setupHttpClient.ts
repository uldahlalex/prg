import {useAtom} from "jotai/index";
import {User} from "../types/user.ts";
import {userAtom} from "../state/atoms/application.state.atoms.ts";
import {AxiosError, AxiosResponse} from "axios";
import toast from "react-hot-toast";
import {http} from "../constants/api.ts";

export function SetupHttpClient() {

    const [user, setUser] = useAtom<User | null>(userAtom);

    http.instance.interceptors.request.use((config) => {
        config.headers.Authorization = localStorage.getItem('token') || '';
        if (config.params) {
            let params = new URLSearchParams();
            Object.keys(config.params).forEach(key => {
                if (Array.isArray(config.params[key])) {
                    config.params[key].forEach((item: any) => {
                        params.append(key, item);
                    });
                } else {
                    params.append(key, config.params[key]);
                }
            });
            config.params = params;
        }
        return config;
    });
    http.instance.interceptors.response.use((response: AxiosResponse) => {
        if (response.status === 401) {
            handleUnauthorizedAccess();
        }
        return response;
    }, (error: AxiosError) => {
        toast(error.response!.data + "")
        if (error.response && error.response.status === 401) {
            handleUnauthorizedAccess();
        }
        return Promise.reject(error);
    });
    const handleUnauthorizedAccess = () => {
        localStorage.removeItem('token');
        setUser(null)
    }
}