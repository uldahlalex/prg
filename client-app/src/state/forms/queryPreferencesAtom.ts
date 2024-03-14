import {atom} from "jotai/index";
import {QueryPreferences} from "../../functions/hooks/getTodosHook.ts";

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "dueDate",
    direction: "asc",

    limit: 50,
    tags: []

});