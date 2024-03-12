import {atom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";
import {User} from "./types/user.ts";
import {QueryPreferences} from "./types/gettodos.params.dto.ts";

export const baseUrl = "http://localhost:5000/api";

export const todosAtom = atom<Todo[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User>({});

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: {
        field: "dueDate",
        direction: "asc"
    },
    filters: {
        limit: 50,
        selectedTags: []
    }
});
