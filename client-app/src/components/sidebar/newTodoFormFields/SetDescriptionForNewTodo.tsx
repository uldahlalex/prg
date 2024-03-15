import {createTodoForm} from "../../../state/forms/createTodoForm.ts";
import {useAtom} from "jotai";

export default function SetDescriptionForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>
        <input placeholder="Description" onChange={(e) => {
            setCreateTodoForm({...todoForm, description: e.target.value})
        }} />
    </>;
}