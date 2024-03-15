import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../../../../httpclient/Api.ts";
import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";
import {QueryPreferences} from "../../App.tsx";

export default function FilterFeedByTag() {
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [tags] = useAtom(tagsAtom);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);


    console.log(tags)
    return <>
        <h1>Filter by tags</h1>

        {tags.map(tag =>
            <input key={tag.id} type="checkbox" value={tag.id} onChange={() => {
                if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                } else {
                    setSelectedTags([...selectedTags, tag]);
                }
                const tagIds = selectedTags.map(t => t.id!);
                setQueryPreferences({...queryPreferences, tags: tagIds});
            }}/>
        )}

    </>;
}