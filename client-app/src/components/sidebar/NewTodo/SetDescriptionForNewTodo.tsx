import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai";
import {TextField} from "@mui/material";

export default function SetDescriptionForNewTodo() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    return <>
        <TextField label="Description" value={todoForm.description!} onChange={(e) => {
            setCreateTodoForm({...todoForm, description: e.target.value})
        }}/>
    </>;
}