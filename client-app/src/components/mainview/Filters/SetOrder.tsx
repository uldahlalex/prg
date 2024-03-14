import {useAtom} from "jotai";
import {useState} from "react";
import {QueryPreferences} from "../../../functions/hooks/getTodosHook.ts";
import {queryPreferencesAtom} from "../../../state/forms/queryPreferencesAtom.ts";

export default function SetOrder() {

    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [selectValue] = useState("title");


    return <>
        <h4>Order by</h4>
        <select value={selectValue} onChange={
            () => {
                setQueryPreferences({...queryPreferences, orderBy: selectValue});
            }}>
            <option value="id">Select value to order by</option>
            <option value="dueDate">Due date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
        </select>
        <button onClick={() => {
            setQueryPreferences({...queryPreferences, direction: queryPreferences.direction == "asc" ? "desc" : "asc"})
        }}>Toggle to {queryPreferences.direction == "asc" ? "Descending" : "Ascending"}</button>
    </>

}