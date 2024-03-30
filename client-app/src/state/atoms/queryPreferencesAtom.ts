import {atom} from "jotai/index";

import {QueryPreferences} from "../../types/QueryPreferences.ts";

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "title",
    direction: "asc",
    showCompleted: true,
    limit: 50,
    tags: []

});