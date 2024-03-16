import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {http} from "../../constants/api.ts";
import {User} from "../../types/user.ts";
import {AuthenticationRequestDto} from "../../../httpclient/Api.ts";
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";
import {decodeJwt} from "../../functions/jwtDecoder.ts";

export default function Login() {

    const navigate = useNavigate();
    const [, setUser] = useAtom<User | null>(userAtom);
    const [loginForm, setloginform] = useState({
        username: "",
        password: ""
    });

    const handleInput = (e) => {
        setloginform({...loginForm, [e.target.name]: e.target.value});
    }

    const signIn = (e) => {
         http.api.signinCreate(loginForm).then((r) => {
            localStorage.setItem('token', r.data.token!)
            navigate('/feed');
            toast("welcome back")
            setUser(decodeJwt(r.data.token!));
        })
    }
    const register = (e) => {
        http.api.registerCreate(loginForm).then((r) => {
            localStorage.setItem('token', r.data.token!)
            navigate('/feed');
            toast("welcome aboard")
            setUser(decodeJwt(r.data.token!));
        });
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
                <input onChange={handleInput} onKeyDown={(e) => {
                    if(e.key === 'Enter') signIn(e);
                }} type="password" name="password"/>
            </div>
            <button onClick={signIn}>Login
            </button>
            <button onClick={register}>Register
            </button>
        </div>
    );
}