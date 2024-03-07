import {useState} from "react";
import {useAtom} from "jotai";
import {userAtom} from "../state.ts";

export default function Login() {

    const [loginForm, setloginform] = useState({
        username: "",
        password: ""
    });

    const [user, setUser] = useAtom(userAtom);

    const handleLogin = () => {
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(atob(data))
                console.log(btoa(data));
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}