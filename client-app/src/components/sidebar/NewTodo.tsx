import {useAtom} from "jotai";
import {tagsAtom, todosAtom} from "../../state/application.state.atoms.ts";
import {useState} from "react";
import SetTitleForCreateTodoForm from "./newTodo/title.tsx";
import AddTagToNewTodo from "./newTodo/addTags.tsx";
import {api} from "../../communication/api.ts";
import {createTodoForm} from "../../state/forms/createTodoForm.ts";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);
    const [selectedTagIndex, setSelectedTagIndex] = useState('-1');

    const handleChanges = (e) => {
        setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value});
    }


    return (
        <>
            <div style={{border: '1px solid blue'}}>"New Todo"
                <SetTitleForCreateTodoForm/>
                <input type="text" placeholder="Description" name="description" value={newTodoForm.description!}
                       onChange={handleChanges}/>
                <input type="date" name="dueDate" value={newTodoForm.dueDate!}
                       onChange={handleChanges}/>
                <input type="number" name="priority" value={newTodoForm.priority} onChange={handleChanges}/>
                Tags:

                <AddTagToNewTodo/>

                <button onClick={async () => {
                    api.api.todosCreate(newTodoForm).then(resp => resp.json()
                    ).then(data => {
                        setTodos([...todos, data])
                    });
                    setSelectedTagIndex('-1');

                }}>Create todo
                </button>
            </div>
        </>
    );
}
