import {queryPreferencesAtom, tagsAtom} from "../../../state.ts";
import {QueryPreferences} from "../../../types/gettodos.params.dto.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../../../types/tag.ts";

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
                setQueryPreferences({...queryPreferences, filters: {...queryPreferences.filters, selectedTags: selectedTags}});
            }} />
        })}

    </>;
}