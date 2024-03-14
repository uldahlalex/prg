import {getTags} from "../requests.ts";
import {useAtom} from "jotai";
import {createTodoForm, tagsAtom} from "../state.ts";
import {useEffect} from "react";
import App from "../components/App.tsx";

export function getTagsHook() {

    //todo fix this yeah
    const [tags, setTags] = useAtom(tagsAtom)

    useEffect(() => {
        getTags().then(resp => resp.json())
            .then(tags => setTags(tags));
    }, [createTodoForm])


}