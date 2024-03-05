import { computed, signal } from "@preact/signals-react";
import {Todo} from "../types/todo.ts";
import {Tag} from "../types/tag.ts";

const getTodos = () => {
  return [
    {id: 1, title: "First", description: "First description", isCompleted: false, priority: 1, dueDate: new Date(), tags: [tags[1]], userId: 1},
    {id: 2, title: "Second", description: "Second description", isCompleted: true, priority: 2, dueDate: new Date(), tags:[tags[0]], userId: 1},
  ]
};



export const tags: Tag[] = [
        {id: 1, name: "work", userId: 1},
        {id: 2, name: "home", userId: 1}
];


export const todos = signal<Todo[]>(getTodos());

export const getDoneAmount = computed(
  () => todos.value.filter((library) => library.isCompleted).length
);

export const getByTag = (tag: Tag) => {
    return todos.value.filter(todo => todo.tags.includes(tag));
}