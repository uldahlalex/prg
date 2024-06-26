import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/user.ts";
import {useAtom} from "jotai/index";
import {decodeJwt} from "../../functions/jwtDecoder.ts";
import {http} from "../../functions/setupHttpClient.ts";
import {userAtom} from "../../state/atoms/user.ts";

export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useAtom<User | null>(userAtom);
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
        <div className="flex justify-center">

            <div className="card w-96 glass">
                <figure><img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Check_mark_9x9.svg/2048px-Check_mark_9x9.svg.png"
                    alt="car!"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Authenticate</h2>

                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" onChange={handleInput} name="username" className="grow"
                               placeholder="email@address.com"/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">

                        <input onChange={handleInput} name="password" type="password" className="grow" onKeyDown={e => {
                            if (e.key === 'Enter') {
                                signIn(e);
                            }
                        }}
                               placeholder="••••••••"/>
                    </label>

                    <div className="card-actions justify-center">
                        <button className="btn btn-secondary" onClick={register}>Sign up</button>
                        <button className="btn btn-primary" onClick={signIn}>Sign in</button>
                    </div>
                </div>
            </div>

        </div>
    );
}