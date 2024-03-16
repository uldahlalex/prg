import NewTodo from "./NewTodo.tsx";
import CreateNewTag from "./newTag/CreateNewTag.tsx";
import React from "react";
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";
import {Navigate} from "react-router-dom";

export default function Sidebar() {

    const [user] = useAtom(userAtom);

    if(!user) return null;

    return(<>
        <div>


            <NewTodo/>

            <CreateNewTag/>
        </div>
    </>)
}