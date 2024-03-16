import React from "react";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import {Toaster} from "react-hot-toast";
import '../eventlisteners/errorhandlers.ts';
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
            <div style={{display: 'flex'}}>

                <div>
                    <Sidebar/>
                </div>

                <div>
                    <RouterProvider router={router}/>

                </div>
            </div>
            <footer>
                {
                    user ? <>
                        <p>Logged in as {JSON.stringify(user)}</p>
                        <button onClick={() => {
                            localStorage.removeItem('token');
                            setUser(null);
                        }}>Sign out
                        </button>
                    </> : null
                }

            </footer>
        </>
    )


}

