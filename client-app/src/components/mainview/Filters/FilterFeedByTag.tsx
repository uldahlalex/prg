import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../../../../httpclient/Api.ts";
import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";
import {QueryPreferences} from "../../App.tsx";

export default function FilterFeedByTag() {
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [tags] = useAtom(tagsAtom);

    console.log(tags)
    return <>
        <h1>Filter by tags</h1>

        {tags.map(tag =>
            <input key={tag.id} type="checkbox" value={tag.id} onChange={() => {
                if (queryPreferences.tags.includes(tag.id!)) {
                    setQueryPreferences({...queryPreferences, tags: queryPreferences.tags.filter(t => t !== tag.id)});
                } else {
                    setQueryPreferences({...queryPreferences, tags: [...queryPreferences.tags, tag.id!]});
                }
            }}/>
        )}

    </>;
}