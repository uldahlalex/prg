import {baseUrl} from "./state.ts";

export const fetchWithAuth = async (url) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const response = await fetch(url, {

        headers: {
            Authorization: `${token}`
        }
    });
    return response;
}

export const login = ({username, password}) => {
    const response = fetch(baseUrl + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then((response) => response.json()).then( (data) => {
        localStorage.setItem('token', data.token);
    });
}
export const register = ({username, password}) => {
    const response = fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then((response) => response.json()).then( (data) => {
        localStorage.setItem('token', data.token);
    });
}

export const getTodosWithTags = async (url) => {
    const response = await fetchWithAuth(url);
    const data = await response.json();
    return data;
}