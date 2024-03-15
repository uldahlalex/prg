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
import {useAtom} from "jotai/index";
import {queryPreferencesAtom} from "../state/forms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom, userAtom} from "../state/application.state.atoms.ts";
import {http} from "../communication/api.ts";

export interface QueryPreferences {
    limit: number | 50;
    tags: number[];
    orderBy: string | "dueDate" | "title" | "priority" | "id";
    direction: string | "asc" | "desc";
}

export default function App() {

    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user] = useAtom(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        http.api
            .todosList(todosQueryPreferences)
            .then(resp => setTodos(resp.data))
        http.api
            .tagsList()
            .then(resp => setTags(resp.data))
    }, [user]);

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

