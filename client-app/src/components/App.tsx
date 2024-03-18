import React from "react";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import {Toaster} from "react-hot-toast";
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
            <Toaster/>
            <div id="verticalContainer" style={{
                display: 'flex',
                marginTop: '50px',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '90vh',
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
                <div id="topContainer">
                    <div style={{display: 'flex', height: '90%', justifyContent: "space-evenly"}}>
                        <div style={{width: '30%'}}>
                            <Sidebar/>
                        </div>

                        <div style={{width: '60%'}}>
                            <RouterProvider router={router}/>
                        </div>
                    </div>

                </div>
                <div id="bottomContainer" style={{justifyContent: 'space-around', wordWrap: 'break-word'}}>
                    <div>                       {
                        user ? <>
                            <p>Logged in as {JSON.stringify(user)}</p>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                            }}>Sign out
                            </button>
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

