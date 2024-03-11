import React from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {queryPreferencesAtom, todosAtom} from "../../state.ts";

import SetOrder from "./Filters/SetOrder.tsx";
import {QueryPreferences} from "../../types/gettodos.params.dto.ts";

export default function Feed() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);


    return (
        <div style={{border: '1px dotted yellow'}}>"Main content"


            <div>
                <SetOrder/>
                {/*<button onClick={get}>Get</button>*/}
            </div>

            <div>
                {
                    // filter.map((todo, index) => <FeedItem key={index} todo={todo} />)
                    todos.map((todo, index) => <FeedItem key={index} todo={todo}/>)

                }
            </div>
        </div>
    );
}
