import {atom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";
import {User} from "./types/user.ts";

export const baseUrl = "http://localhost:5000/api";

export const todosAtom = atom<Todo[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User>({});


//Forms: Filter selection
export const selectedTagsForFeedAtom = atom<Tag[]>([]);
export const orderByAtom = atom<SortBy>({field: 'dueDate', direction: 'asc'});

export interface SortBy {
    field: string;
    direction: string;
}