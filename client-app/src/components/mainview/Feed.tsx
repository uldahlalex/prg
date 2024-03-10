import React, {useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import FeedItem from "./FeedItem.tsx";
import NewTodo from "../sidebar/NewTodo.tsx";
import {orderByAtom, selectedTagsForFeedAtom, tagsAtom, todosAtom} from "../../state.ts";
import {Tag} from "../../types/tag.ts";
import FeedFilters from "./FeedFilters.tsx";

export default function Feed() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [selectedTag, setSelectedTags] = useAtom<Tag[]>(selectedTagsForFeedAtom)
    const [orderBy, setOrderBy] = useAtom(orderByAtom);
    //
    const filter = todos.filter((todo) => {
        if (selectedTag.length === 0) {
            return true;
        }
        return selectedTag.some((tag) => todo.tags.map(t => t.id).includes(tag.id));
    });

    return (
        <div style={{border: '1px dotted yellow'}}>"Main content"


            <div>
               <FeedFilters />
            </div>

            <div>
                {
                    filter
                        .sort((a, b) => {
                            if (orderBy.direction === "asc") {
                                return a[orderBy.field] > b[orderBy.field] ? 1 : -1;}
                             else {
                                return a[orderBy.field] < b[orderBy.field] ? 1 : -1;

                                }
                            })
                        .map((todo, index) => <FeedItem key={index} todo={todo} />)

                }
            </div>
        </div>
    );
}
