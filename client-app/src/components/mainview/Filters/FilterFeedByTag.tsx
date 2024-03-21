import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {queryPreferencesAtom} from "../../../state/atoms/queryPreferencesAtom.ts";

import {QueryPreferences} from "../../../types/QueryPreferences.tsx";
import React from "react";

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

    const value = queryPreferences.tags.map(tag => tags.find(t => t.id === tag)?.name);
    return <>
        <h1>Filter by tags</h1>


        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {tags.map((tag, index) =>
                <div key={index} style={{margin: "10px"}}>
                    <span style={{
                        transform: "rotate(-45deg)",
                        display: "block",
                        textAlign: "right"
                    }}>&nbsp;{tag.name}</span>
                    <input type="checkbox"
                           checked={queryPreferences.tags.includes(tag.id!)}
                           value={tag.id} onChange={(e) => toggleFilterByTodo(tag)}/>
                </div>
                )}
        </div>

    </>
}