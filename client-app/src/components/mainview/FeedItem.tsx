import {http} from "../../functions/setupHttpClient.ts";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {TodoWithTags} from "../../../httpclient/Api.ts";
import {FunctionComponent} from "react";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import toast from "react-hot-toast";
interface TodoProp {
    todo: TodoWithTags;
}
export default function FeedItem({ todo }: TodoProp) {

    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [todos, setTodos] = useAtom(todosAtom);

    return (
        <>
            <div>
                <input checked={todo.isCompleted} onChange={(e) => {
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
                }} type="checkbox"/>
                <button onClick={() => {
                    toast('Not implemented yet');
                    //Open dialog
                }} className="button-clear" title={JSON.stringify(todo)}>
                    ID: {todo.id}: {todo.title} {todo.isCompleted ? 'COMPLETEED' : ''}
                </button>
            </div>

        </>);


}

