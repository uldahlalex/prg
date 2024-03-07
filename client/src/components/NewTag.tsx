import {tagsAtom} from "../state/global.state.ts";
import {useAtom} from "jotai";

export default function NewTag() {

    const [tags, setTags] = useAtom(tagsAtom);


    return(<>
        <button onClick={() => {
            setTags([...tags, {id: 5, name: "new tag", userId: 1}]);
        }}>add</button>
    </>)

}