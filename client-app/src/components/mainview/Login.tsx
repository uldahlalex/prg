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

            <div className="card w-96 glass">
                <figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Check_mark_9x9.svg/2048px-Check_mark_9x9.svg.png" alt="car!"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Authenticate</h2>

                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="email@address.com"/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">

                        <input type="password" className="grow"  placeholder="••••••••"/>
                    </label>

                    <div className="card-actions justify-center">
                        <button className="btn btn-secondary">Sign up</button>
                        <button className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </div>

        </div>
    );
}