import React, {useState} from "react";
import {http} from "../../functions/setupHttpClient.ts";
import {Tag, TodoWithTags} from "../../../httpclient/Api.ts";
import {useAtom} from "jotai/index";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {TodoProp} from "../../types/TodoProp.ts";
import toast from "react-hot-toast";

export default function FeedItemDetails({todo}: TodoProp) {

    const [todos, setTodos] = useAtom(todosAtom);
    const [tags] = useAtom(tagsAtom);
    const [updateTodoForm, setUpdateTodoForm] = useState<TodoWithTags>(todo);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const toggleDetails = () => {
        setIsDetailsOpen(!isDetailsOpen);
    };

    function setPriority(priority) {
        setTodos(todos.map(t => t.id === todo.id ? {
            ...todo,
            priority: priority
        } : t))
        http.api.todosUpdate(todo.id + "", {...todo, priority: priority}).then((resp) => {
            const newTodo: TodoWithTags = resp.data;
            newTodo.tags = todo.tags;
            const todosCopy = [...todos];
            todosCopy[todosCopy.findIndex(t => t.id === todo.id)] = newTodo;
            setTodos([...todosCopy]);
            setTodos([...todosCopy]);
            toast.success("Priority updated!")
        });

    }

    function setTags(checked: boolean, tag: Tag) {
            if (checked) {
                http.api.tagsAddToTodoCreate(tag.id!, todo.id!).then(resp => {
                    const newTodo: TodoWithTags = {...todo, tags: [...todo.tags!, tag]};
                    const todosCopy = [...todos];
                    todosCopy[todosCopy.findIndex(t => t.id === todo.id)] = newTodo;
                    setTodos([...todosCopy]);
                    toast.success("Tag added to todo!");
                })
            } else {
                http.api.tagsRemoveFromTodoDelete(tag.id!, todo.id!).then(resp => {
                    const newTodo = {...todo, tags: todo.tags!.filter(t => t.id !== tag.id)};
                    const todosCopy = [...todos];
                    todosCopy[todosCopy.findIndex(t => t.id === todo.id)] = newTodo;
                    setTodos(todosCopy);
                    toast.success("Tag removed from todo!");
                })
            }
    }

    function saveTodo() {

        http.api.todosUpdate(todo.id + "", updateTodoForm)
            .then(resp => {
                const newTodo: TodoWithTags = {...resp.data, tags: todo.tags};
                const copy = [...todos];
                copy[copy.findIndex(t => t.id === todo.id)] = newTodo;
                setTodos(copy);
                toast.success("Todo updated!");
            });

    }

    function deleteTodo() {
        http.api.todoDelete(todo.id!).then(resp => {
            setTodos(todos.filter(t => t.id !== todo.id));
            toast.success("Todo deleted!");
        });
    }

    const [selectedValue, setSelectedValue] = useState('option1');
    const [otherField, setOtherField] = useState('');

    // Handles radio button change
    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setTodos(todos.map(t => t.id === todo.id ? {
            ...todo,
            priority: event.target.value
        } : t))
        console.log(todos.find(t => t.id === todo.id)!.priority)
        console.log(todo.priority)
    };

    // Example function to demonstrate external changes affecting the radio button
    const updateBasedOnOtherField = (value) => {
        // Assuming some logic here that determines the radio button value
        if(value === 'someCondition') {
            setSelectedValue('option2'); // This changes the radio button's selected value
        }
    };

    const handleOtherFieldChange = (event) => {
        const value = event.target.value;
        setOtherField(value);
        updateBasedOnOtherField(value); // Potentially update radio button based on this field
    };


    return (<>

            <form>
                <div>
                    <input
                        type="radio"
                        value={0}
                        checked={todos.find(t => t.id == todo.id)!.priority === 0}
                        onChange={handleRadioChange}
                    /> Option 1
                    <input
                        type="radio"
                        value={1}
                        checked={todos.find(t => t.id == todo.id)!.priority === 1}
                        onChange={handleRadioChange}
                    /> Option 2
                </div>
                <div>
                    <input
                        type="text"
                        value={otherField}
                        onChange={handleOtherFieldChange}
                    />
                </div>
            </form>
            <div className="p-2 shadow menu dropdown rounded-box bg-base-200 min-w-64 gap-4">

                <input
                    className="input textarea-bordered" onChange={(e) => {
                    setUpdateTodoForm({
                        ...updateTodoForm,
                        title: e.target.value
                    });
                }} value={updateTodoForm.title!} placeholder="Title empty"/>

                <textarea
                    className="textarea textarea-bordered" placeholder="Description empty"
                    onChange={(e) => {
                        setUpdateTodoForm((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                        }));
                    }} value={updateTodoForm.description!}/>

                <div className="flex justify-center flex-nowrap  w-full">

                    <details className="dropdow dropdown-end w-full">
                        <summary className="m-1 bg-base-100 btn w-full">🏷️</summary>
                        <div className=" shadow-2xl menu  z-[1] bg-base-100 rounded-box w-auto h-auto">
                            <div className="grid grid-cols-5 gap-4 gap-x-20 p-10">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex flex-col items-center rotate-45">
                                        <label className="btn m-3 cursor-pointer flex-nowrap">
                                            {tag.name}
                                            <input className="checkbox"
                                                   key={index}
                                                   type="checkbox"
                                                   onSelect={(e) => console.log(e)}
                                                   defaultChecked={todo.tags?.map(t => t.id).includes(tag.id)}
                                                   onChange={(e) => setTags(e.target.checked, tag)}/>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </details>

                    <details className="dropdown dropdown-end w-full">
                        <summary className="m-1 bg-base-100 btn w-full">🗓️</summary>
                        <div
                            className="p-2 shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">

                            <input value={updateTodoForm.dueDate} onChange={(e) => {
                                setUpdateTodoForm({...updateTodoForm, dueDate: e.target.value})
                                http.api.todosUpdate(todo.id + "", updateTodoForm).then((resp) => {
                                    const newTodo: TodoWithTags = {...resp.data, tags: todo.tags};
                                    const copy = [...todos];
                                    copy[copy.findIndex(t => t.id === todo.id)] = newTodo;
                                    setTodos(copy);
                                    toast.success("Date updated!");
                                });
                            }} className="mx-auto w-60 bg-transparent" type="date"/>

                        </div>
                    </details>

                    <details className="dropdown dropdown-end w-full">
                        <summary className="m-1 bg-base-100 btn w-full">❗</summary>
                        <div
                            className="p-2 shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">
                            <div className="flex">
                                {[0, 1, 2, 3, 4].map((priority) =>
                                    <div key={priority}>
                                        <label className="label cursor-pointer -rotate-45">{priority}</label>
                                        <input className="radio"
                                               name="priority"
                                               checked={todo.priority === priority}
                                               value={priority}
                                               type="radio"
                                               onChange={(e) => setPriority(e.target.value)}/></div>
                                )} </div>
                        </div>
                    </details>
                    <button onClick={() => setPriority(2)}>click me</button>

                </div>


                <div className="flex w-full">
                    <button onClick={saveTodo} className="btn btn-primary w-1/2">Save</button>

                    <details className="w-1/2" open={isDetailsOpen} onToggle={toggleDetails}>
                        <summary className="btn btn-error w-full">Delete</summary>
                        <div
                            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-x-hidden overflow-y-auto max-h-60">
                            <button className="btn" onClick={() => setIsDetailsOpen(false)}>No, cancel</button>
                            <button onClick={deleteTodo} className="btn btn-error">Yes, delete</button>
                        </div>
                    </details>
                </div>
            </div>


        </>
    )
}