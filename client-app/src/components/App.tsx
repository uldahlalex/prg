import React, {useEffect} from "react";
import {tagsAtom, todosAtom} from "../state.ts";
import {useAtom} from "jotai";
import '../styles/global.classes.css'
import Sidebar from "./Sidebar.tsx";
import AddTag from "./AddTag.tsx";
import Feed from "./Feed.tsx";
import {createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import Login from "./Login.tsx";

export default function App() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            });
        fetch('http://localhost:5000/api/tags')
            .then((response) => response.json())
            .then((data) => {
                setTags(data);
            });
    }, []);


    const router = createBrowserRouter([
        {
            element: <Feed />,
            path: "/",
        },
        {
            element: <Login />,
            path: "/login",
        },
    ])


    return (
        <>
            <div style={{display: 'flex'}}>
                <div>
                    <div className="bordered">"Sidebar"
                        <Sidebar/>
                    </div>

                    <div className="bordered">"AddTag"
                        <AddTag/>
                    </div>
                </div>

                <div>

                    <div className="bordered">"Main content"
                        <RouterProvider router={router} />
                
                    </div>
                </div>
            </div>


        </>
    )
}

