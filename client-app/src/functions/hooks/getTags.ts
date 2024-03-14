import {useAtom} from "jotai";
import {tagsAtom} from "../../state/application.state.atoms.ts";
import {useEffect} from "react";
import {api} from '../../communication/api.ts';
import {createTodoForm} from "../../state/forms/createTodoForm.ts";

export function getTagsHook() {

    const [tags, setTags] = useAtom(tagsAtom)

    useEffect(() => { //todo why does it produce the logging behavior
        api.api.tagsList()
            .then(resp => {
                console.log(resp); // Log the response
                return resp.json();
            })
            .then(data => {
                const tags = data;
                setTags(tags);
            });}, [createTodoForm])

}