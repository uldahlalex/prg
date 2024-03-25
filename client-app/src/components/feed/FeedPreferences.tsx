import {tagsAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";

import {QueryPreferences} from "../../types/QueryPreferences.tsx";
import React, {ReactNode} from "react";

export default function FeedPreferences() {
    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);
    const [tags] = useAtom(tagsAtom);
    const [selectValue, setSelectValue] = React.useState(queryPreferences.orderBy);

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
        <div className="flex items-stretch">
            <details className="dropdown dropdown-end">
                <summary className="m-1 btn flex">Filter output</summary>

                        <div
                            className="p-2 shadow menu dropdown-right
                           rounded-box max-h-60 min-w-64">

                            {includeTags()}
                            {showCompleted()}
                            {orderBy()}
                        </div>

            </details>
        </div>


    </>

    function includeTags() {
        return <>
            <h4 className="card-title">Include tags</h4>
            <div className="flex">

                {tags.map((tag) =>


                    <label key={tag.id}><label
                        className="label cursor-pointer -rotate-45">{tag.name}</label>
                        <input className="checkbox"
                               key={tag.id}
                               type="checkbox"
                               checked={queryPreferences.tags.includes(tag.id!)}
                               onChange={(e) => toggleFilterByTodo(tag)}/></label>
                )} </div>
        </>;
    }


    function showCompleted() {
        return <div className="flex items-center">
            <label className="label cursor-pointer">Show completed?</label>
            <input className="checkbox" type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                    setQueryPreferences({...queryPreferences, showCompleted: true});
                } else {
                    setQueryPreferences({...queryPreferences, showCompleted: false});
                }
            }}/>

        </div>;
    }


    function orderBy() {
        return <>
            <h4 className="card-title">Ordering</h4>
            <div className="flex flex-row">
                <select className="select" value={selectValue} onChange={() => {
                    setQueryPreferences({...queryPreferences, orderBy: selectValue});
                }}>
                    <option value="dueDate">Due date</option>
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                </select>
                <div className="flex flex-col">
                    <label>Reverse</label>
                    <input type="checkbox" className="checkbox" onChange={() => {
                        setQueryPreferences({
                            ...queryPreferences,
                            direction: queryPreferences.direction == "asc" ? "desc" : "asc"
                        });
                    }}>
                    </input>
                </div>
            </div>
        </>;
    }
}