import {useAtom} from "jotai";
import {tagsAtom} from "./state.ts";

export default function Sidebar() {

    const [tags, setTags] = useAtom(tagsAtom);

    return (
        <div style={{border: '1px solid red'}}>Sidebar
            {
                tags.map((tag, index) => {
                    return <li key={index}>{tag.name}</li>
                })
            }
        </div>
    )
}