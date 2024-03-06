import {ChangeEvent, useState} from "react";
import {tags, todos} from "../state/global.state.ts";
import {Todo} from "../types/todo.ts";
import {Tag} from "../types/tag.ts";

export default function NewTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due, setDue] = useState(new Date());
    const [selectedTags, setTags] = useState<Tag[]>([]);
    const [newTagIndex, setTag] = useState<number>(-1);


    return (
        <>
            <div style={{border: '1px solid green'}}>NewTodo
            <input placeholder="Title" type="text" value={title}
                   onInput={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}/>
            <input placeholder="Description" type="text" value={description}
                   onInput={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/>
            <input placeholder="due" type="date" value={due.toString()}
                   onInput={(event: ChangeEvent<HTMLInputElement>) => setDue(new Date(event.target.value))}/>

           <select onChange={(event) => {
               const id = event.target.value;
               setTag(selectedTags.findIndex(tag => tag.id === parseInt(id)));
                 }}>
               {
                   selectedTags.map((tag, index) => <option value={tag.id}
                                                    key={index}>{tag.name}</option>)
               }
           </select>
            <button onClick={() => {
                if(newTagIndex !== -1)
                    setTags([...selectedTags, selectedTags[newTagIndex]]);
                else {
                   alert('tag is undefined')
                }
            }}>Add tag</button>
            <ul>
                {selectedTags.map((tag, index) => <li key={index}>{tag.name}</li>)}
            </ul>
            <br></br>
            <button onClick={() => {
                const newTodo: Todo =
                    {
                        title: title,
                        priority: 1,
                        dueDate: due,
                        description: description,
                        isCompleted: false,
                        id: todos.value.length + 1,
                        tags: selectedTags,
                        userId: 1
                    }
                todos.value = [newTodo, ...todos.value];
            }}>Submit
            </button>
            </div>
        </>


    );
}
