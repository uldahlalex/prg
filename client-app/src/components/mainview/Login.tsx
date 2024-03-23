import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/user.ts";
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";
import {decodeJwt} from "../../functions/jwtDecoder.ts";
import {http} from "../../functions/setupHttpClient.ts";

export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useAtom<User | null>(userAtom);
    const [loginForm, setloginform] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (!jwt || jwt.length == 0)
            setUser(null);
        else {
            navigate('/feed')
            setUser(decodeJwt(jwt));
        }
    }, [user]);

    const handleInput = (e) => {
        setloginform({...loginForm, [e.target.name]: e.target.value});
    }

    const signIn = (e) => {
        http.api.signinCreate(loginForm).then((r) => {
            localStorage.setItem('token', r.data.token!)
            navigate('/feed');
            setUser(decodeJwt(r.data.token!));
        })
    }
    const register = (e) => {
        http.api.registerCreate(loginForm).then((r) => {
            localStorage.setItem('token', r.data.token!)
            navigate('/feed');
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
                    if (e.key === 'Enter') signIn(e);
                }} type="password" name="password"/>
            </div>
            <button onClick={signIn}>Login
            </button>
            <button onClick={register}>Register
            </button>
        </div>
    );
}