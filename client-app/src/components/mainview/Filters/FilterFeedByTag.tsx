import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";

import {QueryPreferences} from "../../../types/QueryPreferences.tsx";

export default function FilterFeedByTag() {
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [tags] = useAtom(tagsAtom);

    const toggleFilterByTodo = (tag) => {
        {
            if (queryPreferences.tags.includes(tag.id!)) {
                setQueryPreferences({...queryPreferences, tags: queryPreferences.tags.filter(t => t !== tag.id)});
            } else {
                setQueryPreferences({...queryPreferences, tags: [...queryPreferences.tags, tag.id!]});
            }
        }
    }

    return <>
        <h1>Filter by tags</h1>

        {tags.map(tag =>
            
                <span key={tag.id}>
                    {tag.name}
                    <input type="checkbox"
                           checked={queryPreferences.tags.includes(tag.id!)}
                           value={tag.id} onChange={(e) => toggleFilterByTodo(tag)}/></span>


        )}

    </>
}