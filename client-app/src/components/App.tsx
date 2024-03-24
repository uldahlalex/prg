import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./mainview/Feed.tsx";
import Login from "./mainview/Login.tsx";
import { useAtom } from "jotai/index";
import { userAtom } from "../state/atoms/application.state.atoms.ts";
import StateHooks from "../functions/hooks/statehooks.ts";
import Sidebar from "./sidebar/Sidebar.tsx";
import { User } from "../types/user.ts";
import { themeChange } from 'theme-change'
import { SetupHttpClient } from "../functions/setupHttpClient.ts";
import Header from "./etc/header.tsx";

export default function App() {
    const [user, setUser] = useAtom<User | null>(userAtom);

    SetupHttpClient();
    StateHooks();

    return (
        <Router>
            <>
                <Header />
                <div id="verticalContainer" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100vh',
                }}>
                    <div id="topContainer">
                        <div style={{ display: 'flex', height: 'auto', justifyContent: "space-evenly" }}>
                            <div style={{ maxWidth: '30%' }}>
                                <Sidebar />
                            </div>

                            <div style={{ maxWidth: '60%' }}>
                                <Routes>
                                    <Route path="/" element={<Navigate to="/feed" replace />} />
                                    <Route path="/feed" element={<Feed />} />
                                    <Route path="/login" element={<Login />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <div id="bottomContainer" style={{ justifyContent: 'space-around', wordWrap: 'break-word', bottom: '0' }}>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            {user ? (
                                <>
                                    <button onClick={() => {
                                        localStorage.removeItem('token');
                                        setUser(null);
                                    }}>Sign out</button>
                                    <button className="button-clear button-black">Logged in as {JSON.stringify(user.username)}</button>
                                    <button onClick={() => { }}>Switch to other user</button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        </Router>
    );
}
