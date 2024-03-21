import NewTodo from "./NewTodo/NewTodo.tsx";
import CreateNewTag from "./newTag/CreateNewTag.tsx";
import React from "react";
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";
import EditTags from "./EditTags/EditTags.tsx";

export default function Sidebar() {

    const [user] = useAtom(userAtom);

    if (!user) return null;

    return (<>
        <div style={{maxWidth: '100%'}}>

            <img src="https://raw.githubusercontent.com/oxalorg/sakura/master/sakura160.jpg"/>
            <NewTodo/>

            {/*<hr/>*/}
            {/*<CreateNewTag/>*/}
            <hr />
            <EditTags />
            <hr />
        </div>
    </>)
}