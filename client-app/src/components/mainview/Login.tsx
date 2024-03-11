import {useState} from "react";
import {useAtom} from "jotai";
import {baseUrl, userAtom} from "../../state.ts";
import {AuthenticationResponse} from "../../types/authentication.response.ts";
import {decodeJwt} from "../../functions/jwtDecoder.ts";

export default function Login() {

    const [loginForm, setloginform] = useState({
        username: "",
        password: ""
    });

    const [user, setUser] = useAtom(userAtom);

    const handleLogin = () => {
        fetch(baseUrl + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })
            .then((response) => response.json() as AuthenticationResponse)
            .then((data) => {
                console.log(data)
            })

    };

    const register = () => {
        fetch(baseUrl + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })
            .then((response) => response.json() as AuthenticationResponse)
            .then((data) => {
                const user = decodeJwt(data.token!);
            });


    }

    const handleInput = (e) => {
        setloginform({...loginForm, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h1>Login</h1>

            <div>
                <label htmlFor="username">Username</label>
                <input onChange={handleInput} type="text" name="username"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={handleInput} type="password" name="password"/>
            </div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={register}>Register</button>
        </div>
    );
}