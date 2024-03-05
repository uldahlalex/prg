import {Todo} from "../../models/todo.ts";
import {useState} from "react";
import {Tag} from "../../models/tag.ts";

export default function Sidebar({tagParams}: {tagParams: Tag[]}) {
    const [tags, setTags] = useState<Tag[]>(tagParams);
    return (
        <div>
            <h1> Sidebar </h1>
            {tags.map((tag) => { return (
                <div key={tag.id}>
                    <button onClick={() => {


                    }}>{tag.name}</button>
                </div>
            )})}

        </div>
    );
}