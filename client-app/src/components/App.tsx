import React from "react";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import {useAtom} from "jotai/index";
import {userAtom} from "../state/atoms/application.state.atoms.ts";
import StateHooks from "../functions/hooks/statehooks.ts";
import Sidebar from "./sidebar/Sidebar.tsx";
import {User} from "../types/user.ts";


import {SetupHttpClient} from "../functions/setupHttpClient.ts";

export default function App() {

    const [user, setUser] = useAtom<User | null>(userAtom);

    SetupHttpClient();
    StateHooks();

    const router = createBrowserRouter([
        {
            element: <Navigate to="/feed" replace/>,
            path: '/'
        },
        {
            element: <Feed/>,
            path: "/feed",
        },
        {
            element: <Login/>,
            path: "/login",
        },
    ])

    return (

        <>

            {/*<Toaster/>*/}
            <div id="verticalContainer" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100vh',
            }}>
                <div id="topContainer">
                    <div style={{display: 'flex', height: 'auto', justifyContent: "space-evenly"}}>
                        <div style={{maxWidth: '30%'}}>
                            <Sidebar/>
                        </div>

                        <div style={{maxWidth: '60%'}}>
                            <RouterProvider router={router}/>
                        </div>
                    </div>

                </div>
                <div id="bottomContainer" style={{ justifyContent: 'space-around', wordWrap: 'break-word', bottom: '0'}}>
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                        {
                        user ? <>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                            }}>Sign out
                            </button>
                            <button className="button-clear button-black">Logged in
                                as {JSON.stringify(user.username)}</button>

                            <button onClick={() => {

                            }}>
                                Switch to other user
                            </button>
                        </> : null
                        }</div>
                </div>

            </div>
        </>
    )


}

