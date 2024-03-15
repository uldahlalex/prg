import {useAtom} from "jotai";
import {todosAtom} from "../../state/application.state.atoms.ts";
import React, {useState} from "react";
import SetTitleForCreateTodoForm from "./newTodoFormFields/SetTitleForCreateTodoForm.tsx";
import AddTagsToNewTodo from "./newTodoFormFields/AddTagsToNewTodo.tsx";
import {createTodoForm} from "../../state/forms/createTodoForm.ts";
import SetDescriptionForNewTodo from "./newTodoFormFields/SetDescriptionForNewTodo.tsx";
import SetPriorityForNewTodo from "./newTodoFormFields/setPriorityForNewTodo.tsx";
import {http} from "../../communication/api.ts";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);
    const [, setSelectedTagIndex] = useState('-1');

    const handleChanges = (e) => {
        setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value});
    }


    return (
        <>
            <div style={{border: '1px solid blue'}}>
                <SetTitleForCreateTodoForm/>
               <SetDescriptionForNewTodo/>
                <SetPriorityForNewTodo/>
                <input type="date" name="dueDate" value={newTodoForm.dueDate!}
                       onChange={handleChanges}/>
                <AddTagsToNewTodo/>

                <button onClick={async () => {
                    http.api.todosCreate(newTodoForm).then(resp => setTodos([...todos, resp.data]));
                    setSelectedTagIndex('-1');

                }}>Create todo
                </button>
            </div>
        </>
    );
}
