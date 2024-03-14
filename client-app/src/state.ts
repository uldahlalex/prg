import {atom} from "jotai";
import {Api, CreateTodoRequestDto, Tag, TodoWithTags} from "../httpclient/Api.ts";
import {QueryPreferences} from "./functions/getTodosHook.ts";
import {User} from "./types/user.ts";


export const todosAtom = atom<TodoWithTags[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User>({});

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "dueDate",
        direction: "asc",

        limit: 50,
        tags: []

});

export const createTodoForm = atom<CreateTodoRequestDto>({
    title: '',
    description: '',
    tags: [],
    dueDate: '',
    priority: 0
});



