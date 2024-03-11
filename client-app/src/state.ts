import {atom, useAtom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";
import {User} from "./types/user.ts";
import {QueryPreferences} from "./components/mainview/Filters/Query.tsx";

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

const getTodosWhenQueryPreferencesChange =
    atom((get) => get(queryPreferencesAtom),
        (get, set, arg) => {

})
//todo make derived atom to send query with new values
//deliberate complile error here
const e


function buildQueryString(preferences: QueryPreferences): string {
    let queryParams: string[] = [];
    if (preferences.filters.selectedTags.length > 0) {
        const tagIds = preferences.filters.selectedTags.map(tag => tag.id).join(',');
        queryParams.push(`tags=${encodeURIComponent(tagIds)}`);
    }
    if (preferences.filters.limit !== 50) {
        queryParams.push(`limit=${preferences.filters.limit}`);
    }
    queryParams.push(`orderBy=${preferences.orderBy.field}`);
    queryParams.push(`direction=${preferences.orderBy.direction}`);
    const queryString = queryParams.join('&');
    return `${baseUrl}/todos?${queryString}`;
}