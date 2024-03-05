import {Todo} from "../types/todo.ts";
import {todos} from "../store";

export const toggleDone = (selectedTodo: Todo) => {
    const todosCopy = [...todos.value];
    const index = todosCopy.findIndex((todo) => todo.id === selectedTodo.id);
    todosCopy[index].isCompleted = !todos.value[index].isCompleted;
    todos.value = todosCopy;
};