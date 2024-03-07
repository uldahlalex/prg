import {tagsAtom, todosAtom} from "../state.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {CreateTodoDto} from "../types/dtos.ts";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useState<CreateTodoDto>({
        title: '',
        description: '',
        tags: [],
        dueDate: new Date(),
        priority: 0
    })

    const handleChanges = (e) => {
        console.log(e.target.value, e.target.name)
        setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value})
    }


    return (<>
        <div>
            <input type="text" placeholder="Title" name="title" value={newTodoForm.title} onChange={handleChanges}/>
            <input type="text" placeholder="Description" name="description" value={newTodoForm.description}
                   onChange={handleChanges}/>
            <input type="date" name="dueDate" value={newTodoForm.dueDate.toString()} onChange={handleChanges}/>
            <input type="number" name="priority" value={newTodoForm.priority} onChange={handleChanges}/>
            <select onChange={(e) => {
                setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags, tags[e.target.value]]})
            }}>
                {tags.map((tag, index) =>
                    <option value={index} key={index}>{tag.name}</option>)}
            </select>

            <button onClick={async () => {
                const response = await fetch('http://localhost:5000/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTodoForm)
                });
                const data = await response.json();
                setTodos([...todos, data]);
            }}>add
            </button>
        </div>
    </>)
}