import {queryPreferencesAtom} from "../../../state.ts";
import {useAtom} from "jotai";
import {QueryPreferences} from "../../../types/gettodos.params.dto.ts";
import {useState} from "react";

export default function SetOrder() {

    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [selectValue] = useState("title");

    function setOrderBy(param: { direction: string; field: string }) {
        setQueryPreferences({...queryPreferences, orderBy: param})
    }

    return <>
        <h4>Order by</h4>
        <select value={selectValue} onChange={
            () => {
            setOrderBy({field: selectValue, direction: queryPreferences.orderBy.direction})
        }}>
            <option value="id">Select value to order by</option>
            <option value="dueDate">Due date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
        </select>
        <button onClick={() => {
            setQueryPreferences( {...queryPreferences, orderBy: {field: queryPreferences.orderBy.field, direction: queryPreferences.orderBy.direction == "asc" ? "desc" : "asc"}})
        }}>Toggle to {queryPreferences.orderBy.direction == "asc" ? "Descending" : "Ascending"}</button>
    </>

}