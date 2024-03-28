import {useAtom} from "jotai/index";
import {User} from "../types/user.ts";
import {userAtom} from "../state/atoms/application.state.atoms.ts";
import {AxiosError, AxiosResponse} from "axios";
import {Api} from "../../httpclient/Api.ts";
import toast from "react-hot-toast";

export const http = new Api({
    baseURL: 'http://localhost:5000',
});

export function SetupHttpClient() {

    const [user, setUser] = useAtom<User | null>(userAtom);


    http.instance.interceptors.request.use(config => {

        config.headers.Authorization = localStorage.getItem('token') || '';

        return config;
    });
    http.instance.interceptors.response.use((response: AxiosResponse) => {
        if (response.status === 401) {
            handleUnauthorizedAccess();
        }
        return response;
    }, (error: AxiosError<any, any>) => {
        if (error.response && error.response.status === 401) {
            handleUnauthorizedAccess();
        }
        return Promise.reject(error);
    });
    const handleUnauthorizedAccess = () => {
        localStorage.removeItem('token');
        setUser(null)
        toast.error('Unauthorized access');
    }
}

