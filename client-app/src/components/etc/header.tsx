import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";

export default function Header() {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
    const [user, setUser] = useAtom(userAtom);

    const navigate = useNavigate();

    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ];

    return(<>
        <div className="navbar bg-base-100 bg-transparent">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={() => {
                            navigate('feed');
                        }}>Feed</a></li>
                        <li><a onClick={() => {
                            localStorage.removeItem('token');
                            setUser(null);
                            navigate('login');

                        }}>Sign In</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Tick</a>
            </div>
            <div className="navbar-end">


                <div className="flex items-stretch">
                    <details className="dropdown dropdown-end">
                        <summary className="m-1 btn">Theme</summary>
                        <ul onClick={(e: React.MouseEvent<HTMLElement>) => {
                            const selectedTheme = (e.target as HTMLElement).innerText;
                            console.log(selectedTheme)
                            document.documentElement.setAttribute('data-theme', selectedTheme);
                            window.dispatchEvent(new Event('theme-change'));
                            localStorage.setItem('theme', selectedTheme);
                            setTheme(selectedTheme);
                        }} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {
                                themes.map((theme, index) => <li key={index}><a>{theme}</a></li>)
                            }
                        </ul>
                    </details>
                </div>


            </div>
        </div>

    </>)
}