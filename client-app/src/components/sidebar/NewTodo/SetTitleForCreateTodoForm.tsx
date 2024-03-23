import {useAtom} from "jotai";
import React from 'react';

import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {TextField} from "@mui/material";

export default function SetTitleForCreateTodoForm() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);


    return (<>
        <TextField label="Title" value={todoForm.title!} onChange={(e) =>
            setCreateTodoForm({...todoForm, title: e.target.value})} type="text" name="title"/>
    </>);
}