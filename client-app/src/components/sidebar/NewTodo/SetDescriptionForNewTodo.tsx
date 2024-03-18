import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai";

export default function SetDescriptionForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>
        <label htmlFor="description">Description</label>
        <input placeholder="Descriptio" value={todoForm.description!} onChange={(e) => {
            setCreateTodoForm({...todoForm, description: e.target.value})
        }} />
    </>;
}