import {tagsAtom} from "../../../state/application.state.atoms.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {QueryPreferences} from "../../../functions/hooks/getTodosHook.ts";
import {Tag} from "../../../../httpclient/Api.ts";
import {queryPreferencesAtom} from "../../../state/forms/queryPreferencesAtom.ts";

export default function SetTagFilter() {
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [tags] = useAtom(tagsAtom);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    return <>
        <h1>Filter by tags</h1>

        {tags.map(tag => {
            <input type="checkbox" value={tag.id} onChange={() => {
                if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                } else {
                    setSelectedTags([...selectedTags, tag]);
                }
                const tagIds = selectedTags.map(t => t.id!);
                setQueryPreferences({...queryPreferences, tags: tagIds});
            }}/>
        })}

    </>;
}