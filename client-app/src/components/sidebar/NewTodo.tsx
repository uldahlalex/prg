import {useAtom} from "jotai";
import {baseUrl, tagsAtom, todosAtom} from "../../state.ts";
import {CreateTodoDto} from "../../types/dtos.ts";
import {useState} from "react";

export default function NewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useState<CreateTodoDto>({
        title: '',
        description: '',
        tags: [],
        dueDate: new Date(),
        priority: 0
    });
    // New state for controlling the select element
    const [selectedTagIndex, setSelectedTagIndex] = useState('-1');

    const handleChanges = (e) => {
        console.log(e.target.value, e.target.name);
        setNewTodoForm({...newTodoForm, [e.target.name]: e.target.value});
    }

    const setTags = (e) => {
        console.log(e.target.value);
        setSelectedTagIndex(e.target.value); // Update the selected tag index
        setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags, tags[e.target.value]]});
    }

    return (
        <>
            <div style={{border: '1px solid blue'}}>"New Todo"
                <input type="text" placeholder="Title" name="title" value={newTodoForm.title} onChange={handleChanges}/>
                <input type="text" placeholder="Description" name="description" value={newTodoForm.description}
                       onChange={handleChanges}/>
                <input type="date" name="dueDate" value={newTodoForm.dueDate.toISOString().substring(0, 10)} onChange={handleChanges}/>
                <input type="number" name="priority" value={newTodoForm.priority} onChange={handleChanges}/>
                Tags:
                <select
                    value={selectedTagIndex} // Controlled component
                    onChange={(e) => {
                        if(e.target.value === "-1") return;
                        setTags(e);
                    }}>

                    <option value={-1}>Select tag</option>
                    {tags.map((tag, index) =>
                        <option value={index} key={index}>{tag.name}</option>
                    )}
                </select>

                <p>Added tags</p>
                {
                    newTodoForm.tags.map((tag, index) => <p key={index}>
                        <button onClick={() => {
                            setNewTodoForm({...newTodoForm, tags: newTodoForm.tags.filter((t) => t !== tag)});
                        }}><>{tag.name}</></button></p>)
                }

                <button onClick={async () => {
                    const response = await fetch(baseUrl+'/todos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newTodoForm)
                    });
                    const data = await response.json();
                    setNewTodoForm(
                        {
                            title: '',
                            description: '',
                            tags: [],
                            dueDate: new Date(),
                            priority: 0
                        }
                    );
                    setSelectedTagIndex('-1'); // Reset select to default value
                    setTodos([...todos, data]);
                }}>Create todo
                </button>
            </div>
        </>
    );
}
