import {useAtom} from "jotai";
import {createTodoForm, tagsAtom} from "../state.ts";
import {useEffect} from "react";
import {api} from '../api.ts';
export function getTagsHook() {

    const [tags, setTags] = useAtom(tagsAtom)

    useEffect(() => {
        api.api.tagsList().then(resp => resp.json())
            .then(tags => setTags(tags));
    }, [createTodoForm])


}