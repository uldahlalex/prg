import React from "react";
import AddTag from "./sidebar/AddTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import toast, {Toaster} from "react-hot-toast";
import {tagsAtom} from "../state.ts";
import {useAtom} from "jotai";
import {getTags} from "../requests.ts";
import {getTagsHook} from "../functions/getTags.ts";

export default function App() {


    const RequireAuth = ({children}) => {
        const token = localStorage.getItem('token');
        if (token && token.length > 0)
            return children;
        return (<Navigate to="/login" replace/>);
    };
    getTagsHook();


    const router = createBrowserRouter([
        {
          element: <>
          <Navigate to="/feed" replace /></>,
          path: '/'
        },
        {
            element:
                <RequireAuth>
                    <Feed/>
                </RequireAuth>
            ,
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

