//
// import {todos} from "../../state/global.state.ts";
//
// export default function TodoItem({itemId}) {
//     const todo = todos.value.find(todo => todo.id === itemId)!;
//
//     return(<>
//         <li key={todo.id}>
//
//             {todo.title}
//             <h5>{todo.title}</h5>
//             <p>{todo.description}</p>
//             <p>{todo.dueDate.toString()}</p>
//             <p>{todo.isCompleted ? "Done" : "Not Done"}</p>
//             <p>{todo.priority}</p>
//             <p>{todo.tags.map(t => t.name).join(", ")}</p>
//             <button
//                 onClick={() => {
//                     //toggleDone(todo);
//                 }}
//             >
//                 {todo.isCompleted ? <span>✅</span> : <span>⚪</span>}
//             </button>
//
//         </li>
//     </>)
// }