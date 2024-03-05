import {tags, todos} from "../store";
import {Todo} from "../types/todo.ts";
import {useState} from "react";
import {Tag} from "../types/tag.ts";
import {toggleDone} from "../utilities/todohelpers.ts";

export default function TodoList() {

  const [filters, setFilters] = useState<Tag[]>([tags[0]]);
  const [newTagIndex, setTag] = useState<number>(-1);




  const deleteTodo = (selectedTodo: Todo) => {
    todos.value = todos.value.filter(
      (todo) => todo.id !== selectedTodo.id
    );
  };
  return (
      <>
      <div>
        {tags.map((tag, index) =>
                <button onClick={() => {
                setFilters([ tag]);
                  console.log(filters);
                }} key={index}>{tag.name}</button>)
        }
      </div>

    <ul>
      {todos.value.map((todo) => {
        const filtertagIds = filters.map(f => f.id);
        const todoTagIds = todo.tags.map(t => t.id);
        console.log("Filters: "+filtertagIds);
        console.log("Tags: "+todoTagIds);
        if (!filtertagIds.every((value) => todoTagIds.includes(value))) {
          return null;
        }

        return (
                <li key={todo.id}>
                  <p>assign new tag</p>
                  <select onChange={(event) => {
                    const id = event.target.value;
                    setTag(tags.findIndex(tag => tag.id === parseInt(id)));
                    console.log(id);
                  }}>
                    {
                      tags.map((tag, index) => <option value={tag.id}
                                                       key={index}>{tag.name}</option>)
                    }
                  </select>
                  <button onClick={() => {
                    if (newTagIndex !== -1) {
                      const d = todos.value.findIndex(t => t.id === todo.id);
                      const copy = [...todos.value];
                      copy[d].tags.push(tags[newTagIndex]);
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
                        toggleDone(todo);
                      }}
                  >
                    {todo.isCompleted ? <span>✅</span> : <span>⚪</span>}
                  </button>
                  <button onClick={() => deleteTodo(todo)}>Remove</button>
                </li>

        );
      })}
    </ul>
      </>
  );
}
