import React from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {courseIdAtom, fullstackId, todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedPreferences from "./FeedPreferences.tsx";
import {Navigate, useNavigate} from "react-router-dom";
import NewTodoForm from "./NewTodoForm.tsx";
import toast from "react-hot-toast";

export default function Feed() {
    const [todos] = useAtom(todosAtom);


    return (<>
            <div>
                <div>
                    <NewTodoForm/>
                    <div className="divider"></div>
                    <FeedPreferences/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {
                        todos.map((todo) => <FeedItem key={todo.id} todo={todo}/>)

                    }
                </div>
            </div>
        </>

    );
}
