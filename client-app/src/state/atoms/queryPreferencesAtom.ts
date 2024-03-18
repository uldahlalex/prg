import {atom} from "jotai/index";

import {QueryPreferences} from "../../types/QueryPreferences.tsx";

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "title",
    direction: "asc",
    limit: 50,
    tags: [1]

});