import {useAtom} from "jotai";
import React from 'react';

import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";

export default function SetTitleForCreateTodoForm() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);


    return (<>
        <label htmlFor="title">Title</label>
        <input onChange={(e) => setCreateTodoForm({...todoForm, title: e.target.value})} type="text" name="title"/>
    </>);
}