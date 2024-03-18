import React from "react";
import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai/index";

export default function SetDueDateForNewTodo() {

    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);

    return (
        <>        <label>Due date</label>
            <input type="date" name="dueDate" value={newTodoForm.dueDate!}
                   onChange={(e) => {
                       setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value});
                   }}/></>

    )

}