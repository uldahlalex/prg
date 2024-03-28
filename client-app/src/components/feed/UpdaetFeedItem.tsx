import React, {useState} from "react";
import {http} from "../../functions/setupHttpClient.ts";
import {Tag, TodoWithTags} from "../../../httpclient/Api.ts";
import {useAtom} from "jotai/index";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {TodoProp} from "../../types/TodoProp.ts";

export default function UpdateFeedItem({todo}: TodoProp) {

    const [todos, setTodos] = useAtom(todosAtom);
    const [tags] = useAtom(tagsAtom);
    const [updateTodoForm, setUpdateTodoForm] = useState<TodoWithTags>(todo);



    function setPriority(priority: number) {
        return (e) => {
            console.log("Update form: "+updateTodoForm)
            console.log("prop in inner comp: "+todo)
            console.log("atom from inner comp: "+todos)
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
                })
            } else {
                http.api.tagsRemoveFromTodoDelete(tag.id!, todo.id!).then(resp => {
                    const newTodo = {...todo, tags: todo.tags!.filter(t => t.id !== tag.id)};
                    const todosCopy = [...todos];
                    todosCopy[todosCopy.findIndex(t => t.id === todo.id)] = newTodo;
                    setTodos(todosCopy);
                })
            }
        };
    }

    function saveTodo() {
        return () => {
            http.api.todosUpdate(todo.id + "", updateTodoForm)
                .then(resp => {
                    const newTodo: TodoWithTags = {...resp.data, tags: todo.tags};
                    const copy = [...todos];
                    copy[copy.findIndex(t => t.id === todo.id)] = newTodo;
                    setTodos(copy);
                });
        };
    }

    return(<>

        <div className="p-2 shadow menu dropdown rounded-box min-w-64 gap-4">

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

            <div className="flex justify-around">
                <div className="flex items-center">
                    <p className="card-title">🏷Tags</p>{
                    <div className="flex">
                        {tags.map((tag, index) =>
                            <label key={index}><label
                                className="label cursor-pointer -rotate-45">{tag.name}</label>
                                <input className="checkbox"
                                       key={index}
                                       type="checkbox"
                                       checked={todo.tags?.map(t => t.id).includes(tag.id)}
                                       onChange={setTags(tag)}/></label>
                        )} </div>
                }

                </div>

                <div className="flex items-stretch">
                    <p className="card-title">❗Priority:</p>
                    {[0, 1, 2, 3, 4].map((priority) =>
                        <label key={priority}><label
                            className="label cursor-pointer -rotate-45">{priority}</label>
                            <input className="radio"
                                   name="priority"
                                   key={priority}
                                   type="radio"
                                   onChange={setPriority(priority)}/></label>
                    )}
                </div>
            </div>


            <div className="flex">
                <button onClick={saveTodo()} className="btn btn-primary w-full">Save</button>
            </div>


        </div>


    </>)
}