import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";
import {QueryPreferences} from "../../../types/QueryPreferences.tsx";
import {useAtom} from "jotai/index";
import toast from "react-hot-toast";
import {todosAtom} from "../../../state/atoms/application.state.atoms.ts";

export default function FilterByState() {

    const [todos, setTodos] = useAtom(todosAtom);
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);

    return <>
        <label>Show completed</label>
        <input onChange={(e) => {
            if(e.target.checked) {
                setQueryPreferences({...queryPreferences, showCompleted: true});
            } else  {
                setQueryPreferences({...queryPreferences, showCompleted: false});
            }
        }}  type="checkbox" />
    </>;
}