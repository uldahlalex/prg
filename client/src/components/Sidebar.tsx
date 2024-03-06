import {tags} from '../state/global.state.ts'



export default function Sidebar() {

    return (
        <>
            <div style={{border: '1px solid red'}}>Sidebar
                {tags.value.map((tag, index) => {
                    return <button onClick={() => {
                     //   const t: Todo[] = [...todos.value];
                    }} key={index}>{tag.name}</button>
                })}   </div>
            yes
        </>


    )
}