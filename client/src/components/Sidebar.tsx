import {tagsAtom} from '../state/global.state.ts'
import {useAtom} from "jotai";



export default function Sidebar() {

    const [tags, setTags] = useAtom(tagsAtom);

    return (
        <>
            <div style={{border: '1px solid red'}}>Sidebar
                {tags.map((tag, index) => {
                    return <li  key={index}>{tag.name}</li>
                })}   </div>
            yes
        </>


    )
}