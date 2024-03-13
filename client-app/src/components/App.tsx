import React from "react";
import AddTag from "./sidebar/AddTag.tsx";
import '../error.handler.ts';
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import toast, {Toaster} from "react-hot-toast";

export default function App() {
    const RequireAuth = ({children}) => {
        const token = localStorage.getItem('token');
        if (token && token.length > 0)
            return children;
        return (<Navigate to="/login" replace/>);
    };


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
                    </div>

                    <div>
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

