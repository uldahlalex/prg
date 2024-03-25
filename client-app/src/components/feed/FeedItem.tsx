import {http} from "../../functions/setupHttpClient.ts";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {TodoWithTags} from "../../../httpclient/Api.ts";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";

interface TodoProp {
    todo: TodoWithTags;
}

export default function FeedItem({todo}: TodoProp) {

    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [todos, setTodos] = useAtom(todosAtom);

    return (
        <>
            <details className="dropdown" data-tip={JSON.stringify(todo)}><
                input type="checkbox" className="checkbox"
                      checked={todo.isCompleted}
                      onChange={toggleDone}/>
                <button className="btn-outline">
                    {
                        TodoText(todo)
                    }
                </button>
                <summary className="m-1">
                    <span className="badge badge-primary">{todo.tags!.map(t => t.name).join(", ")}</span>


                </summary>
            </details>

        </>);


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

