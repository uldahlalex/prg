import {http} from "../../functions/setupHttpClient.ts";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {TodoWithTags} from "../../../httpclient/Api.ts";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import React, {useState} from "react";

interface TodoProp {
    todo: TodoWithTags;
}

export default function FeedItem({todo}: TodoProp) {

    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [todos, setTodos] = useAtom(todosAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [tags] = useAtom(tagsAtom);

    const [updateTodoForm, setUpdateTodoForm] = useState<TodoWithTags>(todo);


    function toggleDetails() {
        setIsOpen(!isOpen);
    }

    return (
        <>


        <details className="dropdown dropdown-end w-full m-2" data-tip={JSON.stringify(todo)}>
            <summary className={`btn w-full flex-nowrap flex !important justify-start ${isOpen ? 'bg-base-300' : 'bg-base-100'}`} onClick={toggleDetails}>
                <input type="checkbox" className="checkbox checkbox-lg" checked={todo.isCompleted} onChange={toggleDone}/>
                <p>{TodoText(todo)}</p>
            </summary>
            <div className="p-2 shadow menu dropdown rounded-box min-w-64 gap-4">

                <input
                    className="input textarea-bordered" onChange={(e) => {
                    setUpdateTodoForm({
                        ...todo,
                        title: e.target.value
                    });
                }} value={todo.title!} placeholder="Title empty"/>

                <textarea
                    className="textarea textarea-bordered" onChange={() => {

                        setUpdateTodoForm({
                            ...todo,
                            description: todo.description})
                }} value={todo.description!} placeholder="Description empty"/>

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
                                           checked={updateTodoForm.tags!.map(t => t.id).includes(tag.id!)}
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   http.api.todosAddTagCreate(todo.id!, tag.id!).then(resp => {
                                                       const newTodo = {...todo, tags: [...todo.tags!, tag]};
                                                         setTodos([...todos, newTodo]);
                                                   })
                                               } else {
                                                   http.api.todosAddTagCreate(todo.id!, tag.id!).then(resp => {
                                                         const newTodo = {...todo, tags: todo.tags!.filter(t => t.id !== tag.id)};
                                                         setTodos([...todos, newTodo]);
                                                   })
                                               }
                                           }}/></label>
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
                               onChange={(e) => {
                                      setUpdateTodoForm({
                                        ...updateTodoForm,
                                        priority: priority
                                      });
                                      http.api.todosUpdate(todo.id + "",
                                            updateTodoForm
                                        ).then(resp => {
                                                setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                                            });
                               }}/></label>
                    )}
                </div>
            </div>


            <div className="flex">
                <button onClick={() => {
                    http.api.todosUpdate(todo.id + "", updateTodoForm)
                        .then(resp => {
                            setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                        });
                }} className="btn btn-primary w-full">Save</button>
            </div>


        </div>
        </details>


</>
)
    ;


    function TodoText(todo) {
        return (<>
            ID: {todo.id}: {todo.title} {todo.isCompleted ? 'COMPLETEED' : ''}
        </>);
    }

    function toggleDone(e) {
        if (e.target.checked) {
            http.api.todosUpdate(todo.id + "", {...todo, isCompleted: true})
                .then(resp => {
                    if (queryPreferences.showCompleted) setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                    else setTodos(todos.filter(t => t.id !== todo.id));
                });
        } else {
            http.api.todosUpdate(todo.id + "", {...todo, isCompleted: false})
                .then(resp => {
                    setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                });
        }
    }


}

