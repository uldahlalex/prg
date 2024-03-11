import React, {useState} from "react";
import {Tag} from "../../../types/tag.ts";
import {useAtom} from "jotai/index";
import { queryPreferencesAtom, tagsAtom} from "../../../state.ts";

export default function Query() {

    const [tags, setTags] = useAtom(tagsAtom);




    return <>
        {/*<div style={{border: '1px solid red'}}>"Query preferences"*/}
        {/*    <p>Selected tags: {*/}
        {/*        queryPreferences.filters.selectedTags && queryPreferences.filters.selectedTags.length > 0 ?*/}
        {/*            queryPreferences.filters.selectedTags.map((tag) => tag.name + " ") : "All tags!"*/}
        {/*    }</p>*/}
        {/*    <ul>*/}
        {/*        /!*inverse*!/*/}
        {/*        {tags.map((tag, index) => (*/}
        {/*            <li key={index}>*/}

        {/*                <button onClick={() => {*/}
        {/*                    if (queryPreferences.filters.selectedTags.includes(tag)) {*/}
        {/*                        setQueryPreferences({...queryPreferences, filters: {*/}
        {/*                            limit: queryPreferences.filters.limit,*/}
        {/*                                selectedTags: queryPreferences.filters.selectedTags.filter((t) => t !== tag)*/}
        {/*                            }});*/}
        {/*                    }*/}
        {/*                }}>{*/}
        {/*                    queryPreferences.filters.selectedTags.includes(tag) ? "Hide: " + tag.name :*/}
        {/*                        "Select: " + tag.name*/}
        {/*                }</button>*/}
        {/*            </li>*/}
        {/*        ))*/}
        {/*        }*/}
        {/*    </ul>*/}
            {/*<h4>Order by</h4>*/}

            {/*<select*/}
            {/*    value={}*/}
            {/*    onChange={(e) => {*/}
            {/*        if(e.target.value === "-1") return;*/}
            {/*        setTags(e);*/}
            {/*    }}>*/}

            {/*    <option value={-1}>Select tag</option>*/}
            {/*    {tags.map((tag, index) =>*/}
            {/*        <option value={index} key={index}>{tag.name}</option>*/}
            {/*    )}*/}
            {/*</select>*/}

            {/*<p></p>*/}
            {/*{*/}

            {/*}*/}

        {/*</div>*/}
    </>
}


export interface QueryPreferences {
    filters: {
        limit: number | 50;
        selectedTags: Tag[];
    }
    orderBy: {
        field: string | "dueDate" | "title" | "priority" | "id";
        direction: string | "asc" | "desc";
    };

}