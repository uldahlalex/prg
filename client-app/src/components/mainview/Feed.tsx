import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import {todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";

import FeedOrderBy from "./Filters/FeedOrderBy.tsx";
import FilterFeedByTag from "./Filters/FilterFeedByTag.tsx";
import {useNavigate} from "react-router-dom";
import FilterByState from "./Filters/FilterByState.tsx";

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

    return (
        <div>


            <div>
                <FilterFeedByTag/>
                <FilterByState />
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
