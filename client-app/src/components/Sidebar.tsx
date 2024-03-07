import {useAtom} from "jotai";
import {tagsAtom} from "../state.ts";

export default function Sidebar() {

    const [tags, setTags] = useAtom(tagsAtom);

    return (
        <div>
            {
                tags.map((tag, index) => {
                    return <li key={index}>{tag.name}</li>
                })
            }
        </div>
    )
}