import React, { useState, useEffect } from 'react';
import {Todo} from "./models/todo.ts";
import TodoItem from "./TodoItem.tsx";



function DataFetchingComponent() {
    const [data, setData] = useState<Todo[] | null>([
   ]);

    // Step 3: Fetch data
    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);


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
