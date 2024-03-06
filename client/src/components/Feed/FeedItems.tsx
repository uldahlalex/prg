import {filterAllTodosByTagId, tags, todos} from "../../state/global.state.ts";
import {Todo} from "../../types/todo.ts";
import {useState} from "react";
import {Tag} from "../../types/tag.ts";
export default function FeedItems() {

  const [filters, setFilters] = useState<Tag[]>(tags.value);
  const [newTagIndex, setTag] = useState<number>(-1);



  const deleteTodo = (selectedTodo: Todo) => {
    todos.value = todos.value.filter(
      (todo) => todo.id !== selectedTodo.id
    );
  };


  return (
      <>
        <div style={{border: '1px solid yellow'}}>FeedItems
      <div>
        {tags.value.map((tag, index) =>
                <button onClick={() => {
                setFilters([ tag]);
                  console.log(filters);
                }} key={index}>{tag.name}</button>)
        }
      </div>

    <ul>
        { filters && filters.length > 0 ? filterAllTodosByTagId(filters[0].id).map((todo) => {
        return (
                <li key={todo.id}>
                  <p>assign new tag</p>
                  <select onChange={(event) => {
                    const id = event.target.value;
                    setTag(filters.findIndex(tag => tag.id === parseInt(id)));
                    console.log(id);
                  }}>
                    {
                      filters.map((tag, index) => <option value={tag.id}
                                                       key={index}>{tag.name}</option>)
                    }
                  </select>
                  <button onClick={() => {
                    if (newTagIndex !== -1) {
                      const d = todos.value.findIndex(t => t.id === todo.id);
                      const copy = [...todos.value];
                      copy[d].tags.push(filters[newTagIndex]);
                      todos.value = copy;
                    }
                  }}>Add tag
                  </button>
                  {todo.title}
                  <h5>{todo.title}</h5>
                  <p>{todo.description}</p>
                  <p>{todo.dueDate.toString()}</p>
                  <p>{todo.isCompleted ? "Done" : "Not Done"}</p>
                  <p>{todo.priority}</p>
                  <p>{todo.tags.map(t => t.name).join(", ")}</p>
                  <button
                      onClick={() => {
                        //toggleDone(todo);
                      }}
                  >
                    {todo.isCompleted ? <span>✅</span> : <span>⚪</span>}
                  </button>
                  <button onClick={() => deleteTodo(todo)}>Remove</button>
                </li>

        );
      }) : null}
    </ul> </div>
      </>
  );
}
