import {http} from "../../functions/setupHttpClient.ts";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";
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


    function toggleDetails() {
        setIsOpen(!isOpen);
    }

    return (
        <>


        <details className="dropdown dropdown-end w-full" data-tip={JSON.stringify(todo)}>
            <summary className={`m-1 btn w-full flex-nowrap flex justify-start ${isOpen ? 'bg-base-300' : 'bg-base-100'}`}
                     onClick={toggleDetails}>
                <input type="checkbox" className="checkbox"
                       checked={todo.isCompleted}
                       onChange={toggleDone}/>{TodoText(todo)}
            </summary>
            <div className="p-2 shadow menu dropdown rounded-box min-w-64 gap-4">

                <input
                    className="input textarea-bordered" onChange={() => {
                    //todo
                }} value={todo.title!} placeholder="Title empty"/>

                <textarea
                    className="textarea textarea-bordered" onChange={() => {
                    //todo
                }} value={todo.description!} placeholder="Description empty"/>

                <div className="flex justify-around">
                    <div className="flex items-center">
                        <p className="card-title">🏷Tags</p>{
                        todo.tags!.map(t => {
                            return (
                                <div key={t.id}>&nbsp;&nbsp;<span className="badge badge-primary">{t.name}</span>
                                </div>
                            )
                        })}
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
                                           // setCreateTodoForm({
                                           //     ...todoForm,
                                           //     priority: priority
                                           // });
                                       }}/></label>
                        )}
                    </div>
                </div>


                <div className="flex">
                    <button className="btn btn-primary w-full">Save</button>
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

