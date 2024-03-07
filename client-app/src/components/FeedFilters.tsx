import React from "react";
import {useAtom} from "jotai/index";
import {selectedTagsForFeedAtom, tagsAtom} from "../state.ts";

export default function FeedFilters() {

    const [tags, setTags] = useAtom(tagsAtom);
    const [selectedTag, setSelectedTags] = useAtom(selectedTagsForFeedAtom);

    return(<>
        <h2>Filter and sort selection</h2>
        <p>Selected tags: {
            selectedTag && selectedTag.length> 0 ?
            selectedTag.map((tag) => tag.name + " ") : "All tags!"
        }</p>
        <ul>
            {tags.map((tag, index) => (
                <li key={index}>

                    <button onClick={() => {
                        if (selectedTag.includes(tag)) {
                            setSelectedTags(selectedTag.filter((t) => t !== tag));
                        } else {
                            setSelectedTags([...selectedTag, tag]);
                        }
                    }}>{
                        selectedTag.includes(tag) ? "Hide: "+tag.name :
                        "Select: "+tag.name
                    }</button>
                </li>
            ))}
        </ul>
    </>)
}