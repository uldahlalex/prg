import {useAtom} from "jotai";
import {todosAtom} from "../../../state/atoms/application.state.atoms.ts";
import React from "react";
import SetTitleForCreateTodoForm from "./SetTitleForCreateTodoForm.tsx";
import SetTagsToNewTodo from "./SetTagsToNewTodo.tsx";
import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import SetDescriptionForNewTodo from "./SetDescriptionForNewTodo.tsx";
import SetPriorityForNewTodo from "./setPriorityForNewTodo.tsx";

import {http} from "../../../functions/setupHttpClient.ts";
import SetDueDateForNewTodo from "./SetDueDateForNewTodo.tsx";
import {faker} from "@faker-js/faker";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);

    return (
        <>
            <div className="collapse collapse-arrow">
                <SetTitleForCreateTodoForm/>
                <SetDescriptionForNewTodo/>
                <SetPriorityForNewTodo/>
                <SetDueDateForNewTodo/>
                <SetTagsToNewTodo/>
                <button className="btn btn-primary" style={{width: '100%'}} onClick={async () => {
                    http.api.todosCreate(newTodoForm).then(resp => {
                        setTodos([...todos, resp.data]);
                        setNewTodoForm({
                            title: faker.hacker.phrase(),
                            description: faker.lorem.paragraph(),
                            tags: [],
                            dueDate: new Date().toISOString().slice(0, 10),
                            priority: 0
                        });

                    });
                }}>Create todo!
                </button>
            </div>
        </>
    );
}
