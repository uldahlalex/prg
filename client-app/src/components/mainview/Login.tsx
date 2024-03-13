import {useState} from "react";
import {useAtom} from "jotai";
import {baseUrl, userAtom} from "../../state.ts";
import {AuthenticationResponse} from "../../types/authentication.response.ts";
import {decodeJwt} from "../../functions/independent/jwtDecoder.ts";
import {login, register} from "../../requests.ts";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();
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
            <button  onClick={ () => login(loginForm).then(() => {
                navigate('/feed');
                toast("welcome back")
            })}>Login</button>
            <button onClick={() => register(loginForm).then(() => {
                navigate('/feed');
                toast("welcome aboard")
            })}>Register</button>
        </div>
    );
}