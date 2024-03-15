import {createTodoForm} from "../../../state/forms/createTodoForm.ts";
import {useAtom} from "jotai";

export default function SetPriorityForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>

        <select onChange={(e) => {
            setCreateTodoForm({...todoForm, priority: Number(e.target.value)})
        }}>
            {[0,1,2,3,4].map(priority =>
                <option key={priority} value={priority}>{priority}</option>
            )}
        </select>
    </>;
}