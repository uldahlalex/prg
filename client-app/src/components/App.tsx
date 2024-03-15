import React, {useEffect} from "react";
import CreateNewTag from "./sidebar/newTag/CreateNewTag.tsx";
import Feed from "./mainview/Feed.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./mainview/Login.tsx";
import NewTodo from "./sidebar/NewTodo.tsx";
import {Toaster} from "react-hot-toast";
import '../eventlisteners/errorhandlers.ts';
import '../communication/addJwtToAllRequests.ts';
import RequireAuth from "./etc/requireAuth.tsx";
import {getTodos} from "../functions/hooks/getTodosHook.ts";
import {GetData} from "../functions/hooks/getTags.ts";
import {useAtom} from "jotai/index";
import {queryPreferencesAtom} from "../state/forms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom} from "../state/application.state.atoms.ts";
// import {api} from "../communication/api.ts";
// import {createLogger} from "vite";
import {Api} from "../../httpclient/Api.ts";

export default function App() {

    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        // Fetch todos
        let api = new Api({
            baseUrl: 'http://localhost:5000'
        });
        api.api.todosList(todosQueryPreferences)
            .then(resp => resp.json())
            .then(todos => setTodos(todos))
            .catch(error => console.log("Error fetching todos:", error));

        // Fetch tags
        let api2 = new Api({
            baseUrl: 'http://localhost:5000'
        });

        api2.api.tagsList()
            .then(resp => resp.json())
            .then(tags => console.log(tags))
            .catch(error => console.log("Error fetching tags:", error));
    }, []);

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
            {/*<button onClick={() => {*/}
            {/*    fetch('http://localhost:5000/api/tags').then(r => {*/}
            {/*        return r.json()*/}
            {/*    }).then(r => {*/}
            {/*        console.log(r)*/}
            {/*    })*/}
            {/*}}></button>*/}
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

