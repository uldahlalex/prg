import {atom} from "jotai/index";
import {QueryPreferences} from "../../components/App.tsx";

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "dueDate",
    direction: "asc",
    limit: 50,
    tags: []

});