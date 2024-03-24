import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Feed from "./mainview/Feed.tsx";
import Login from "./mainview/Login.tsx";
import {useAtom} from "jotai/index";
import {userAtom} from "../state/atoms/application.state.atoms.ts";
import StateHooks from "../functions/hooks/statehooks.ts";
import Sidebar from "./sidebar/Sidebar.tsx";
import {User} from "../types/user.ts";
import {SetupHttpClient} from "../functions/setupHttpClient.ts";
import Header from "./etc/header.tsx";

export default function App() {

    SetupHttpClient();
    StateHooks();

    return (
        <Router>

                <Header/>

                <div style={{display: 'flex', height: 'auto', justifyContent: "space-evenly"}}>

                    <div style={{maxWidth: '30%'}}><Sidebar/></div>

                    <div style={{maxWidth: '60%'}}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/feed" replace/>}/>
                            <Route path="/feed" element={<Feed/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </div>

                </div>


        </Router>
    );
}
