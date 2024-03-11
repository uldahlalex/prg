import React, {useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import NewTodo from "../sidebar/NewTodo.tsx";
import {baseUrl, queryPreferencesAtom, tagsAtom, todosAtom} from "../../state.ts";
import {Tag} from "../../types/tag.ts";

import Query, {QueryPreferences} from "./Filters/Query.tsx";
import SetOrder from "./Filters/SetOrder.tsx";

export default function Feed() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);




    return (
        <div style={{border: '1px dotted yellow'}}>"Main content"


            <div>
                <SetOrder/>
                <button onClick={get}>Get</button>
            </div>

            <div>
                {
                   // filter.map((todo, index) => <FeedItem key={index} todo={todo} />)
                    todos.map((todo, index) => <FeedItem key={index} todo={todo} />)

                }
            </div>
        </div>
    );
}
