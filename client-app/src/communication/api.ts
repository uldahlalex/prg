import {Api} from "../../httpclient/Api.ts";

export const http = new Api({

    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || ''
    },

});