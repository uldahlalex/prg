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


    function setPriority(priority: number) {
        return (e) => {
            setUpdateTodoForm({
                ...updateTodoForm, priority: priority
            });
            http.api.todosUpdate(todo.id + "", updateTodoForm).then((resp) => {
                setTodos((currentTodos) => {
                    return currentTodos.map((t) => {
                        if (t.id === todo.id) {
                            const mostRecentTodo = currentTodos.find((item) => item.id === todo.id);
                            const newTodo = {...mostRecentTodo, ...resp.data, tags: todo.tags, priority: priority};
                            return newTodo;
                        }
                        return t;
                    });
                });
                toast.success("Priority updated!")

            });
        }
    }

    function setTags(tag: Tag) {
        return (e) => {
            if (e.target.checked) {
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
        };
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

    return (<>

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
                    <summary className="m-1 bg-base-100 btn w-full">Edit tags🏷️</summary>
                    <div className=" shadow-2xl menu  z-[1] bg-base-100 rounded-box w-auto h-auto">
                        <div className="grid grid-cols-5 gap-4 gap-x-20 p-10">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex flex-col items-center rotate-45">
                                    <label className="btn m-3 cursor-pointer flex-nowrap">
                                        {tag.name}
                                        <input className="checkbox"
                                               key={index}
                                               type="checkbox"
                                               checked={todo.tags?.map(t => t.id).includes(tag.id)}
                                               onChange={setTags(tag)}/>
                                    </label>

                                </div>
                            ))}
                        </div>
                    </div>
                </details>

                <details className="dropdown dropdown-end w-full">
                    <summary className="m-1 bg-base-100 btn w-full">Edit priority❗</summary>
                    <div
                        className="p-2 shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">
                        <div className="flex">
                            {[0, 1, 2, 3, 4].map((priority) =>
                                <div key={priority}>
                                    <label className="label cursor-pointer -rotate-45">{priority}</label>
                                    <input className="radio"
                                           checked={updateTodoForm.priority === priority}
                                           key={priority}
                                           type="radio"
                                           onChange={setPriority(priority)}/></div>
                            )} </div>
                    </div>
                </details>

                {/*<div className="flex items-stretch">*/}
                {/*    <p className="card-title">❗Priority:</p>*/}
                {/*    {[0, 1, 2, 3, 4].map((priority) =>*/}
                {/*        <label key={priority}><label*/}
                {/*            className="label cursor-pointer -rotate-45">{priority}</label>*/}
                {/*            <input className="radio"*/}
                {/*                   name="priority"*/}
                {/*                   key={priority}*/}
                {/*                   type="radio"*/}
                {/*                   onChange={setPriority(priority)}/></label>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>


            <div className="flex w-full">
                <button onClick={saveTodo} className="btn btn-primary w-1/2">Save</button>

                <details className="w-1/2">
                    <summary className="btn btn-error w-full">Delete</summary>
                    <div
                        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-x-hidden overflow-y-auto max-h-60">
                        <button className="btn">No, cancel</button>
                        <button onClick={deleteTodo} className="btn btn-error">Yes, delete</button>
                    </div>
                </details>

            </div>


        </div>


        </>
    )
}