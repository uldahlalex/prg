import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {http} from "../../communication/api.ts";
import {User} from "../../types/user.ts";
import {AuthenticationRequestDto} from "../../../httpclient/Api.ts";

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
            <button onClick={() => http.api.signinCreate(loginForm).then((r) => {
                localStorage.setItem('token', r.data.token!)
                navigate('/feed');
                toast("welcome back")
            })}>Login
            </button>
            <button onClick={() => http.api.registerCreate(loginForm).then((r) => {
                localStorage.setItem('token', r.data.token!)
                navigate('/feed');
                toast("welcome aboard")
            })}>Register
            </button>
        </div>
    );
}