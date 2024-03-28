import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Feed from "./feed/Feed.tsx";
import Login from "./login/Login.tsx";
import StateHooks from "../functions/hooks/statehooks.ts";
import {SetupHttpClient} from "../functions/setupHttpClient.ts";
import Header from "./etc/header.tsx";
import {Toaster} from "react-hot-toast";

export default function App() {

    SetupHttpClient();
    StateHooks();

    return (
        <Router>

            <Toaster />
            <Header/>
            <div className="display mx-auto w-4/5">
                <Routes>
                    <Route path="/" element={<Navigate to="/feed" replace/>}/>
                    <Route path="/feed" element={<Feed/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>



        </Router>
    );
}
