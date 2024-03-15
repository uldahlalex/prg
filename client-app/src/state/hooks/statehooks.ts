import {useAtom} from "jotai/index";
import {useEffect} from "react";
import {http} from "../../communication/api.ts";
import {queryPreferencesAtom} from "../atoms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom, userAtom} from "../atoms/application.state.atoms.ts";

export default function StateHooks() {
    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user] = useAtom(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        http.api
            .todosList({
                tags: todosQueryPreferences.tags,
                limit: todosQueryPreferences.limit,
                orderBy: todosQueryPreferences.orderBy,
                direction: todosQueryPreferences.direction
            })
            .then(resp => setTodos(resp.data))

    }, [user, todosQueryPreferences]);

    useEffect(() => {
        http.api
            .tagsList()
            .then(resp => setTags(resp.data))
    }, [user]);

}
