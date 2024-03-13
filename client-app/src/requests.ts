import {baseUrl} from "./state.ts";
import {redirect, useNavigate} from "react-router-dom";
import {jwt} from "./functions/independent/getJwt.ts";



export const login = ({username, password}) => fetch(baseUrl + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt()
        },
        body: JSON.stringify({username, password})
    });

export const register = ({username, password}) =>
     fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": jwt()
        },
        body: JSON.stringify({username, password}),
    });


export const getTodosWithTags = (url) => fetch(
    url,
    {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": jwt()
        }
    }
);