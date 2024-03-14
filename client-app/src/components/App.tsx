import React from "react";
import AddTag from "./sidebar/AddTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import toast, {Toaster} from "react-hot-toast";
import {getTagsHook} from "../functions/hooks/getTags.ts";
import ReactDOM from "react-dom/client";
import '../eventlisteners/errorhandlers.ts';
import '../communication/addJwtToAllRequests.ts';
import RequireAuth from "./etc/requireAuth.tsx";
import {getTodos} from "../functions/hooks/getTodosHook.ts";

export default function App() {
    getTagsHook();
    getTodos();
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

   // ReactDOM.createRoot(document.getElementById('root')!).render(
        return (
        <>
            <Toaster/>
            <div style={{display: 'flex'}}>
                <div>
                    <div>


                        <NewTodo/>

                        <AddTag/>
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

