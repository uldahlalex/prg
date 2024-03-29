import React, {useEffect} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Feed from "./feed/Feed.tsx";
import Login from "./login/Login.tsx";
import StateHooks from "../functions/hooks/statehooks.ts";
import {SetupHttpClient} from "../functions/setupHttpClient.ts";
import Header from "./etc/header.tsx";
import toast, {Toaster} from "react-hot-toast";
import Fullstack from "./lessons/fullstack2024.tsx";
import FAQ from "./etc/faq.tsx";
import {useMessageHandler} from "../functions/hooks/navigateToCourse.tsx";
import ProgrammingII2024 from "./lessons/programmingII2024.tsx";
import {courseIdAtom, fullstackId} from "../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";


export default function App() {

    SetupHttpClient();
    StateHooks();



    const [courseId] = useAtom(courseIdAtom);


    return (
        <Router>

            <Toaster />
            <Header/>
            <MessageHandler />


            <div className="display mx-auto w-4/5">
                <Routes>
                    <Route path="/" element={<Navigate to="/fullstack" replace/>}/>

                    <Route path="/feed" element={
                        <CheckId>
                        <Feed/>
                        </CheckId>
                    }/>
                    <Route path="/login" element={
                        <CheckId>
                        <Login/>
                        </CheckId>                    }/>
                    <Route path="/fullstack" element={

                            <Fullstack/>

                    }/>
                    <Route path="/programmingii2024" element={
                        <CheckId>
                        <ProgrammingII2024/>
                        </CheckId>
                    }/>
                </Routes>
            </div>



        </Router>
    );
    function MessageHandler() {
        useMessageHandler(); // This now works because MessageHandler is rendered within <Router>
        return null; // This component doesn't need to render anything itself
    }

    function CheckId({ children }) {
        const [courseId] = useAtom(courseIdAtom);
        if (courseId==fullstackId) {
            console.log("TOAST HERE"); //todo toast not displaying
            toast.error("You're only allowed to see Fullstack 2024 course content", {position: "top-right"});
            return <Navigate to="/fullstack" replace />;
        }
        return children;
    }
}
