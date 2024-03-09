import React, {useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import FeedItem from "../FeedItem.tsx";
import NewTodo from "../sidebar/NewTodo.tsx";
import {selectedTagsForFeedAtom, tagsAtom, todosAtom} from "../../state.ts";
import {Tag} from "../../types/tag.ts";
import FeedFilters from "./FeedFilters.tsx";

export default function Feed() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [selectedTag, setSelectedTags] = useAtom<Tag[]>(selectedTagsForFeedAtom)

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
                 //   todos.map((todo, index) => <FeedItem key={index} todo={todo} />)
                   // selectedTag.some(t => todos.map(todo => todo.tags.includes(t)).map((todo, index) => <FeedItem key={index} todo={todo} />))
                    filter.map((todo, index) => <FeedItem key={index} todo={todo} />)

                }
            </div>
        </div>
    );
}
