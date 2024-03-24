import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedPreferences from "./Filters/FeedPreferences.tsx";
import {useNavigate} from "react-router-dom";
import NewTodo from "../sidebar/NewTodo/NewTodo.tsx";

export default function Feed() {
    const navigate = useNavigate();
    const [todos] = useAtom(todosAtom);
    const [user] = useAtom(userAtom);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]); // Include navigate to satisfy dependency array

    if (!user) {
        return null;
    }

    return (<>
            <div>


                <div>

                    <FeedPreferences/>


                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {
                        todos.map((todo, index) => <FeedItem key={index} todo={todo}/>)

                    }
                </div>
            </div>
        </>

    );
}
