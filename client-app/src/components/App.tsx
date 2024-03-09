import React, {useEffect} from "react";
import {baseUrl, tagsAtom, todosAtom} from "../state.ts";
import {useAtom} from "jotai";
import '../styles/global.classes.css'
import AddTag from "./sidebar/AddTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import Login from "./Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";

export default function App() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        fetch(baseUrl+'/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            });
        fetch(baseUrl+'/tags')
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
                    <div>
                        <NewTodo/>
                    </div>

                    <div>
                        <AddTag/>
                    </div>
                </div>

                <div>

                    <div>
                    <RouterProvider router={router} />
                
                    </div>
                </div>
            </div>


        </>
    )
}

