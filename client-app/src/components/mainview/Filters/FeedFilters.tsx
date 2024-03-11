// import React, {useState} from "react";
// import {useAtom} from "jotai/index";
// import { tagsAtom} from "../../../state.ts";
//
// export default function FeedFilters() {
//
//     const [tags, setTags] = useAtom(tagsAtom);
//
//
//     return(<>
//         <div style={{border: '1px solid red'}}>"Feed filters"
//             <h4>Filter and sort selection</h4>
//             <p>Selected tags: {
//                 selectedTag && selectedTag.length > 0 ?
//                     selectedTag.map((tag) => tag.name + " ") : "All tags!"
//             }</p>
//             <ul>
//                 {tags.map((tag, index) => (
//                     <li key={index}>
//
//                         <button onClick={() => {
//                             if (selectedTag.includes(tag)) {
//                                 setSelectedTags(selectedTag.filter((t) => t !== tag));
//                             } else {
//                                 setSelectedTags([...selectedTag, tag]);
//                             }
//                         }}>{
//                             selectedTag.includes(tag) ? "Hide: " + tag.name :
//                                 "Select: " + tag.name
//                         }</button>
//                     </li>
//                 ))
//                     }
//             </ul>
//             <h4>Order by</h4>
//             <button onClick={() => setOrderBy({field: "title", direction: "asc"})}>Due date</button>
//         </div>
//
//     </>)
// }