import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem.tsx";
import {Todo} from "../../models/todo.ts";
import {Tag} from "../../models/tag.ts";

export default function Feed({userTodoParams} ){
    const [userTodos, setUserTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setUserTodos(userTodoParams);
    }, [userTodoParams]);
    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1 style={{textAlign: "center"}}>Feed</h1>
                    <ul>
                        {userTodos.map((todo) => {

                            return (


                                <li key={todo.id}>
                                    <div>{JSON.stringify(todo)}</div>
                                    <TodoItem {...todo}/>
                                </li>
                            );
                        })}
                    </ul>
            </div>
        </>
    );
}

