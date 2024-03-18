import {useAtom} from "jotai";
import {todosAtom} from "../../../state/atoms/application.state.atoms.ts";
import React, {useState} from "react";
import SetTitleForCreateTodoForm from "./SetTitleForCreateTodoForm.tsx";
import SetTagsToNewTodo from "./SetTagsToNewTodo.tsx";
import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import SetDescriptionForNewTodo from "./SetDescriptionForNewTodo.tsx";
import SetPriorityForNewTodo from "./setPriorityForNewTodo.tsx";

import {http} from "../../../functions/setupHttpClient.ts";
import SetDueDateForNewTodo from "./SetDueDateForNewTodo.tsx";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);

    return (
        <>
            <div >
                <SetTitleForCreateTodoForm/>
               <SetDescriptionForNewTodo/>
                <SetPriorityForNewTodo/>
          <SetDueDateForNewTodo />
                <SetTagsToNewTodo/>
                <button style={{width: '100%'}} onClick={async () => {
                    http.api.todosCreate(newTodoForm).then(resp => {
                        setTodos([...todos, resp.data]);
                        setNewTodoForm({
                            dueDate: "",
                            title: "",
                            description: "",
                            priority: 0,
                            tags: []
                        });

                    });
                }}>Create todo!
                </button>
            </div>
        </>
    );
}
