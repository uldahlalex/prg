import {ChangeEvent, useState} from "react";
import {tags, todos} from "../state/global.state.ts";
import {Todo} from "../types/todo.ts";
import {Tag} from "../types/tag.ts";
import {CreateTodoDto} from "../types/dtos.ts";

export default function NewTodo() {

const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    due: new Date(),
    tags: [],
    priority: 1
});




const handleChange = (e: any) => {
    setFormValues({

            ...formValues,
            [e.target.name]: e.target.value


    });
}
    return (
        <>
            <div style={{border: '1px solid green'}}>NewTodo
                <input placeholder="Title" type="text" value={formValues.title}
                       onChange={handleChange} name="title"/>
                   <br></br>
                <input placeholder="Description" type="text" value={formValues.description}
                       onChange={handleChange} name="description"/>
                <br></br>
                <input type="number" value={formValues.priority} onChange={handleChange} name="priority"/>
                <input type="date" value={formValues.due.toString()} onChange={handleChange} name="due"/>
                <br></br>
                <select onChange={(e) => {
                    console.log(e.target.value)
                    setFormValues({
                        ...formValues,
                        tags: [...formValues.tags, tags.value[e.target.value]]
                    })
                }}>
                    <option value={-1}>Select a tag</option>
                    {tags.map((tag, index) => <option value={index} key={index}>{tag.name}</option>)}
                </select>

                <ul>
                    {formValues.tags.map((tag, index) => <li key={index}>{tag}</li>)}
                </ul>
                <br></br>
                <button onClick={async () => {
                    const newTodo: CreateTodoDto = {...formValues}
                    const resp = await fetch('http://localhost:5000/api/todos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newTodo)
                    })
                    const newTodoValues = await resp.json();
                    todos.value = [newTodoValues, ...todos.value];
                }}>Submit
                </button>
            </div>
        </>


    );
}
