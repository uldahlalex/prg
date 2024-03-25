import React from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedPreferences from "./FeedPreferences.tsx";
import {useNavigate} from "react-router-dom";
import NewTodoForm from "./NewTodoForm.tsx";

export default function Feed() {
    const navigate = useNavigate();
    const [todos] = useAtom(todosAtom);
    const [user] = useAtom(userAtom);


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
