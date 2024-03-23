import {useAtom} from "jotai";
import {useState} from "react";
import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";

import {QueryPreferences} from "../../../types/QueryPreferences.tsx";
import {Button, MenuItem, Select} from "@mui/material";

export default function FeedOrderBy() {

    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [selectValue] = useState("title");


    return <>
        <h4>Order by</h4>
        <Select value={selectValue} onChange={
            (e) => {
                console.log(queryPreferences)
                setQueryPreferences({...queryPreferences, orderBy: e.target.value});
            }}>
            <MenuItem value="dueDate">Due date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
        </Select>
        <Button onClick={() => {
            setQueryPreferences({...queryPreferences, direction: queryPreferences.direction == "asc" ? "desc" : "asc"})
        }}>Toggle to {queryPreferences.direction == "asc" ? "Descending" : "Ascending"}</Button>
    </>

}