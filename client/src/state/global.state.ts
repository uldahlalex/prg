
import {Todo} from "../types/todo.ts";
import {Tag} from "../types/tag.ts";
import {atom} from "jotai/vanilla/atom";



export const todosAtom = atom([] as Todo[]);
export const tagsAtom = atom([] as Tag[]);

export const doneTodos = atom(get => {
    return get(todosAtom).filter(todo => todo.isCompleted);
})