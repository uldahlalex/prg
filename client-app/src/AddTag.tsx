import {tagsAtom} from "./state.ts";
import {useAtom} from "jotai";

export default function AddTag() {
    const [tags, setTags] = useAtom(tagsAtom);

    return(<>
        <button onClick={() => {
            setTags([...tags, {id: 5, name: "new tag", userId: 1}]);

        }}>add tag</button>

    </>)
}