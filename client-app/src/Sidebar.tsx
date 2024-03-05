import {Todo} from "./models/todo.ts";
import {useState} from "react";
import {Tag} from "./models/Tag.ts";

export default function Sidebar({tagParams}: {tagParams: Tag[]}) {
    const [tags, setTags] = useState<Tag[]>(tagParams);

    console.log(tagParams);

    return (
        <div>
            <h1> Sidebar </h1>

            {tags.map((tag) => { return (
                <div key={tag.id}>
                    <button onClick={() => {
                        //Filter here

                    }}>{tag.name}</button>
                </div>
            )})}

        </div>
    );
}