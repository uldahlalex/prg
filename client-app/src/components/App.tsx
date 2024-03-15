import React, {useEffect} from "react";
import CreateNewTag from "./sidebar/newTag/CreateNewTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import {Toaster} from "react-hot-toast";
import '../eventlisteners/errorhandlers.ts';
import RequireAuth from "./etc/requireAuth.tsx";
import {useAtom} from "jotai/index";
import {queryPreferencesAtom} from "../state/atoms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom, userAtom} from "../state/atoms/application.state.atoms.ts";
import {http} from "../communication/api.ts";
import StateHooks from "../state/hooks/statehooks.ts";

export interface QueryPreferences {
    limit: number | 50;
    tags: number[];
    orderBy: string | "dueDate" | "title" | "priority" | "id";
    direction: string | "asc" | "desc";
}

export default function App() {

    StateHooks();

    const router = createBrowserRouter([
        {
            element: <Navigate to="/feed" replace/>,
            path: '/'
        },
        {
            element: <RequireAuth redirect="/login">
                <Feed/>
            </RequireAuth>,
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
                    <div>


                        <NewTodo/>

                        <CreateNewTag/>
                    </div>
                </div>

                <div>

                    <div>
                        <RouterProvider router={router}/>

                    </div>
                </div>
            </div>
        </>
    )


}

