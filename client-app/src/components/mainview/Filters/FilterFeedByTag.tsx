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




        <div className="flex items-stretch">
            <details className="dropdown dropdown-end">
                <summary className="m-1 btn">Include tags</summary>

                {

                    <>
                    <div
                        className="form-control p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-x-hidden overflow-y-auto max-h-60">
                        {tags.map((tag, index) =>

                            <span key={index}><label className="label cursor-pointer">{tag.name}</label><input className="checkbox"
                                                                                               key={index}
                                                                                               type="checkbox"
                                                                                               checked={queryPreferences.tags.includes(tag.id!)}
                                                                                               onChange={(e) => toggleFilterByTodo(tag)}/></span>
                   )}
        </div>
            </>


            }


        </details>
    </div>


</>
}