import {useAtom} from "jotai";
import {createTodoForm} from "../../../state.ts";

export default function SetTitleForCreateTodoForm() {
    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);


    return(<>
        <label htmlFor="title">Title</label>
        <input onChange={(e) => setCreateTodoForm({...todoForm, title: e.target.value})} type="text" name="title"/>
    </>);
}