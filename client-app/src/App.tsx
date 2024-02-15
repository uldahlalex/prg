import React, { useState, useEffect } from 'react';
import {Todo} from "./models/todo.ts";
import TodoItem from "./TodoItem.tsx";



function DataFetchingComponent() {
    // Step 1: Initiate state
    // Step 2: Type annotations for state
    const [data, setData] = useState<Todo[] | null>([
        {id: 1, title: "First", description: "First description", done: false, priority: "High", due: new Date(), tags: ["tag1", "tag2"]},
        {id: 2, title: "Second", description: "Second description", done: true, priority: "Low", due: new Date(), tags: ["tag3", "tag4"]},
    ]);

    return (
        <div>
            <h1>Data from API</h1>
            {data && (
                <ul>
                    {data.map((item) =>
                        (
                            <TodoItem key={item.id} {...item} />
                        ))}
                </ul>
            )}
        </div>
    );
}

export default DataFetchingComponent;
