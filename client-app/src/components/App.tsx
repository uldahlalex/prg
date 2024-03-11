import React from "react";
import '../styles/global.classes.css'
import AddTag from "./sidebar/AddTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import {getTodos} from "../functions/getTodosHook.ts";

export default function App() {
    getTodos();
    const router = createBrowserRouter([
        {
            element: <Feed/>,
            path: "/",
        },
        {
            element: <Login/>,
            path: "/login",
        },
    ])


    return (
        <>
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

