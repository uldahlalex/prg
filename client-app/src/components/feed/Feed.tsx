import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {courseIdAtom, fullstackId, todosAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedPreferences from "./FeedPreferences.tsx";
import {Navigate, useNavigate} from "react-router-dom";
import NewTodoForm from "./NewTodoForm.tsx";
import toast from "react-hot-toast";
import {userAtom} from "../../state/atoms/user.ts";

export default function Feed() {
    const [todos] = useAtom(todosAtom);
    const [courseId] = useAtom(courseIdAtom);
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();


    useEffect(() => {

        //todo refactor to state
        if(courseId==fullstackId)
        {
            navigate("/"+fullstackId);
            toast("Hey, it looks like you're on the Fullstack 2024 course, I'll take you there!");
        }
    }, []);





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
