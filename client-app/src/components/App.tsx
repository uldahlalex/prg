import React, { useState, useEffect } from 'react';
import {Todo} from "../models/todo.ts";
import TodoItem from "./feed/TodoItem.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";
import {Tag} from "../models/tag.ts";
import Feed from "./feed/Feed.tsx";
import {loadConfigFromFile} from "vite";



function DataFetchingComponent() {
    const [userTodos, setTodosForUser] = useState<Todo[] | null>([]);
    const [userTags, setUserTagsForUser] = useState<Tag[] | null>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => setTodosForUser(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/tags')
            .then((response) => response.json())
            .then((data) => setUserTagsForUser(data));
    }, []);


    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Sidebar tagParams={userTags!}/>
                <Feed userTodoParams={userTodos!}/>
            </div>
        </>
    );

}

export default DataFetchingComponent;
