import {http} from "../../functions/setupHttpClient.ts";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import React, {useState} from "react";
import UpdateFeedItem from "./UpdaetFeedItem.tsx";
import {TodoProp} from "../../types/TodoProp.ts";

export default function FeedItem({todo}: TodoProp) {

    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [todos, setTodos] = useAtom(todosAtom);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <details className="dropdown dropdown-end w-full my-2" data-tip={JSON.stringify(todo)}>
                <summary
                    className={`btn w-full flex-nowrap flex !important justify-start ${isOpen ? 'bg-base-300' : 'bg-base-100'}`}
                    onClick={() => setIsOpen(!isOpen)}>
                    <input type="checkbox" className="checkbox checkbox-lg" checked={todo.isCompleted}
                           onChange={toggleDone}/>
                    <p>{todo.title}</p>
                </summary>

                <UpdateFeedItem todo={todo}/>

            </details>
        </>
    )
        ;


    function toggleDone(e) {
        http.api.todosUpdate(todo.id + "", {...todo, isCompleted: e.target.checked})
            .then(resp => {
               setTodos(todos.map(t => t.id === todo.id ? {
                    ...todo,
                    isCompleted: !e.target.checked
                } : t));
               if(!queryPreferences.showCompleted) {
                   setTodos(todos.filter(t => t.id !== todo.id));
               }
            });
    }


}

