import React, {useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import FeedItem from "./FeedItem";
import NewTodo from "./NewTodo";
import {tagsAtom, todosAtom} from "../state.ts";
import {Tag} from "../types/tag.ts";

export default function Feed() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [selectedTag, setSelectedTags] = useState<Tag[]>([])


    const filter = todos.filter((todo) => {
        if (selectedTag.length === 0) {
            return true;
        }
        return selectedTag.some((tag) => todo.tags.map(t => t.id).includes(tag.id));
    });

    return (
        <div>
            <div><NewTodo /></div>

            <div>
                <h2>Filters</h2>
                <p>Selected tags: {selectedTag.map((tag) => JSON.stringify(tag) )}</p>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>
                            <button onClick={() => {
                                if (selectedTag.includes(tag)) {
                                    setSelectedTags(selectedTag.filter((t) => t !== tag));
                                } else {
                                    setSelectedTags([...selectedTag, tag]);
                                }
                            }}>{tag.name}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {
                    filter.map((todo, index) => <FeedItem key={index} todo={todo} />)
                }
            </div>
        </div>
    );
}
