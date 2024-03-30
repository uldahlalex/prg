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
import {courseIdAtom, fullstackId, sys} from "../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {CheckIdProp} from "../types/TodoProp.ts";


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
                    <Route path="/" element={<Navigate to={'/'+(courseId || 'feed')} replace/>}/>

                    <Route path="/feed" element={
                        <Feed/>
                    }/>
                    <Route path="/login" element={

                        <Login/>
                                   }/>
                    <Route path={"/"+fullstackId} element={

                            <Fullstack/>

                    }/>
                    <Route path={"/"+sys} element={
                        <ProgrammingII2024/>
                    }/>
                </Routes>
            </div>



        </Router>
    );
    function MessageHandler() {
        useMessageHandler(); // This now works because MessageHandler is rendered within <Router>
        return null; // This component doesn't need to render anything itself
    }


    function CheckId({disallowedPageIds, children}: CheckIdProp) {
        const [courseId] = useAtom(courseIdAtom);
        if (disallowedPageIds.includes(courseId!)) {
            console.log("TOAST HERE"); //todo toast not displaying
            toast.error("This section in particular is not visible on this Moodle course", {position: "top-right"});
            return <Navigate to={'/'+courseId} replace />;
        }
        return children;
    }
}
