//
// import {Todo} from "../../types/todo.ts";
// import {useState} from "react";
// import {Tag} from "../../types/tag.ts";
// import TodoItem from "./TodoItem.tsx";
// import {useAtomValue} from "jotai/react/useAtomValue";
// import {tagsAtom, todosAtom} from "../../state/global.state.ts";
// import {useSetAtom} from "jotai/react/useSetAtom";
//
//
// export default function FeedItems() {
//
//     const [filters, setFilters] = useState<Tag[]>(useAtomValue(tagsAtom));
//     const [newTagIndex, setTag] = useState<number>(-1);
//
//
//     const todos = useAtomValue(todosAtom);
//     const tags = useAtomValue(tagsAtom);
//     const deleteTodo = (selectedTodo: Todo) => {
//         useSetAtom(todosAtom)
//         todos = todos.filter(
//             (todo) => todo.id !== selectedTodo.id
//         );
//     };
//
//
//     return (
//         <>
//             <div style={{border: '1px solid yellow'}}>FeedItems
//                 <div>
//                     {tags.value.map((tag, index) =>
//                         <button onClick={() => {
//                             setFilters([tag]);
//                             console.log(filters);
//                         }} key={index}>{tag.name}</button>)
//                     }
//                 </div>
//                 {todos.value.map((todo)=>
//                     <>
//                         <p>assign new tag</p>
//                         <select onChange={(event) => {
//                             const id = event.target.value;
//                             setTag(filters.findIndex(tag => tag.id === parseInt(id)));
//                             console.log(id);
//                         }}>
//                             {
//                                 filters.map((tag, index) => <option value={tag.id}
//                                                                     key={index}>{tag.name}</option>)
//                             }
//                         </select>
//                         <button onClick={() => {
//                             if (newTagIndex !== -1) {
//                                 const d = todos.value.findIndex(t => t.id === todo.id);
//                                 const copy = [...todos.value];
//                                 copy[d].tags.push(filters[newTagIndex]);
//                                 todos.value = copy;
//                             }
//                         }}>Add tag
//                         </button>
//                         <TodoItem itemId={todo}/>
//                         <button onClick={() => deleteTodo(todo)}>Remove</button>
//
//                     </>
//                 )}
//
//
//             </div>
//
//         </>
//     );
// }
