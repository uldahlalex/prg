import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Header() {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

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
        <div className="navbar bg-base-100">
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
                        <li><a>Sign In</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Tick</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
                <select value={theme} onChange={(e) => {
                    const selectedTheme = e.target.value;
                    document.documentElement.setAttribute('data-theme', selectedTheme);
                    window.dispatchEvent(new Event('theme-change'));
                    localStorage.setItem('theme', selectedTheme);
                    setTheme(selectedTheme);
                }} className="select w-full max-w-xs">

                    {
                        themes.map((theme, index) => <option key={index} value={theme}>{theme}</option>)

                    }
                </select>

                <label className="swap swap-rotate">
                    <input type="checkbox"/>
                    <div className="swap-on">DARKMODE</div>
                    <div className="swap-off">LIGHTMODE</div>
                </label>
            </div>
        </div>

    </>)
}