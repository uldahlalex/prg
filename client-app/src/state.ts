import {atom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";

export const baseUrl = "http://localhost:5000/api";

export const todosAtom = atom<Todo[]>([]);
export const tagsAtom = atom<Tag[]>([]);
