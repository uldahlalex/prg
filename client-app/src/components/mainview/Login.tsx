import {useState} from "react";
import {useAtom} from "jotai";
import {baseUrl, userAtom} from "../../state.ts";
import {AuthenticationResponse} from "../../types/authentication.response.ts";
import {decodeJwt} from "../../functions/jwtDecoder.ts";
import {login, register} from "../../requests.ts";

export default function Login() {

    const [loginForm, setloginform] = useState({
        username: "",
        password: ""
    });

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
            <button  onClick={ () => login(loginForm)}>Login</button>
            <button onClick={() => register(loginForm)}>Register</button>
        </div>
    );
}