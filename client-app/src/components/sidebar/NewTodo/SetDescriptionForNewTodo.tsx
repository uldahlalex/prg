import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai";

export default function SetDescriptionForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>
        <label htmlFor="description">Description</label>
        <input className="input input-bordered" placeholder="Descriptio" value={todoForm.description!} onChange={(e) => {
            setCreateTodoForm({...todoForm, description: e.target.value})
        }}/>
    </>;
}