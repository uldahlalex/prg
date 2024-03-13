import {useAtom} from "jotai";
import {baseUrl, createTodoForm, tagsAtom, todosAtom} from "../../state.ts";
import {CreateTodoDto} from "../../types/dtos.ts";
import {useState} from "react";
import {createTodo} from "../../requests.ts";
import SetTitleForCreateTodoForm from "./newTodo/title.tsx";
import AddTag from "./AddTag.tsx";
import AddTagToNewTodo from "./newTodo/addTags.tsx";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);
    const [selectedTagIndex, setSelectedTagIndex] = useState('-1');

    const handleChanges = (e) => {
        setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value});
    }



    return (
        <>
            <div style={{border: '1px solid blue'}}>"New Todo"
            <SetTitleForCreateTodoForm />
                <input type="text" placeholder="Description" name="description" value={newTodoForm.description}
                       onChange={handleChanges}/>
                <input type="date" name="dueDate" value={newTodoForm.dueDate.toISOString().substring(0, 10)}
                       onChange={handleChanges}/>
                <input type="number" name="priority" value={newTodoForm.priority} onChange={handleChanges}/>
                Tags:

                <AddTagToNewTodo />

                <button onClick={async () => {
                    createTodo(newTodoForm)
                        .then(res => res.json())
                        .then(data => {
                            setNewTodoForm(
                                {
                                    title: '',
                                    description: '',
                                    tags: [],
                                    dueDate: new Date(),
                                    priority: 0
                                }
                            );
                            setSelectedTagIndex('-1');
                            setTodos([...todos, data]) });
                }}>Create todo
                </button>
            </div>
        </>
    );
}
