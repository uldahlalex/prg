import React from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {todosAtom} from "../../state/application.state.atoms.ts";

import SetOrder from "./Filters/SetOrder.tsx";

export default function Feed() {
    const [todos] = useAtom(todosAtom);


    return (
        <div style={{border: '1px dotted yellow'}}>"Main content"


            <div>
                <SetOrder/>

            </div>

            <div>
                {
                    todos.map((todo, index) => <FeedItem key={index} todo={todo}/>)

                }
            </div>
        </div>
    );
}
