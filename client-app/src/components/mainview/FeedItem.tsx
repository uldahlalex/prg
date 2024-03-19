import {http} from "../../functions/setupHttpClient.ts";
import {todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";
import {TodoWithTags} from "../../../httpclient/Api.ts";
import {FunctionComponent} from "react";
interface TodoProp {
    todo: TodoWithTags;
}
export default function FeedItem({ todo }: TodoProp) {

    const [todos, setTodos] = useAtom(todosAtom);

    return (
        <>
            <input checked={todo.isCompleted} onChange={(e) => {
                if(e.target.checked) {
                    http.api.todosUpdate(todo.id+"", {...todo, isCompleted: true})
                        .then(resp => {
                        setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                    });
                } else {
                    http.api.todosUpdate(todo.id+"", {...todo, isCompleted: false})
                        .then(resp => {
                        setTodos(todos.map(t => t.id === todo.id ? resp.data : t));
                    });
                }
            }} type="checkbox" />
            <button className="button-clear" title={JSON.stringify(todo)}>
                ID: {todo.id}: {todo.title} {todo.isCompleted ? 'COMPLETEED' : ''}
            </button>
        </>);


}

