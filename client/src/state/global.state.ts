import { computed, signal } from "@preact/signals-react";
import {Todo} from "../types/todo.ts";
import {Tag} from "../types/tag.ts";



export const tags = signal<Tag[]>([]);
export const todos = signal<Todo[]>([]);

export const getDoneAmount = computed(
  () => todos.value.filter((library) => library.isCompleted).length
);

export const filterAllTodosByTagId = (tagId: number) => {
    return todos.value.filter((todo) => {
        return todo.tags.some((tag) => tag.id === tagId);
    });
}