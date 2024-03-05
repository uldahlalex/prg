import React, { useState, useEffect } from 'react';
import {Todo} from "./models/todo.ts";
import TodoItem from "./TodoItem.tsx";
import Sidebar from "./Sidebar.tsx";
import {Tag} from "./models/Tag.ts";



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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Sidebar tagParams={userTags!} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>Feed</h1>
                {userTodos && (
                    <ul>
                        {userTodos.map((item) =>
                            (
                                <TodoItem key={item.id} {...item} />
                            ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    );

}

export default DataFetchingComponent;
