import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai";

export default function SetPriorityForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>

        <label>Priority</label>
        <select value={todoForm.priority} onChange={(e) => {
            setCreateTodoForm({...todoForm, priority: Number(e.target.value)})
        }}>
            {[0, 1, 2, 3, 4].map(priority =>
                <option key={priority} value={priority}>
                    {priority === 0 ? '0: Lowest priority' :
                        priority === 4 ? '4: Highest priority' :
                            priority}
                </option>
            )}
        </select>
    </>;
}