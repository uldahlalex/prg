import React from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedOrderBy from "./Filters/FeedOrderBy.tsx";
import FilterFeedByTag from "./Filters/FilterFeedByTag.tsx";

export default function Feed() {
    const [todos] = useAtom(todosAtom);


    return (
        <div style={{border: '1px dotted yellow'}}>"Main content"


            <div>
                <FilterFeedByTag />
                <FeedOrderBy/>

            </div>

            <div>
                {
                    todos.map((todo, index) => <FeedItem key={index} todo={todo}/>)

                }
            </div>
        </div>
    );
}
