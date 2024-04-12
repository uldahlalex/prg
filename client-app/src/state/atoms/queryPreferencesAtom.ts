import {atom} from "jotai/index";

import {QueryPreferences} from "../../types/QueryPreferences.ts";
import {useEffect} from "react";
import {http} from "../../functions/setupHttpClient.ts";
import {atomEffect} from "jotai-effect";
import {todosAtom} from "./application.state.atoms.ts";
import {userAtom} from "./user.ts";
import {AxiosResponse} from "axios";
import {TodoWithTags} from "../../../httpclient/Api.ts";

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: "title",
    direction: "asc",
    showCompleted: true,
    limit: 50,
    tags: []
});

export const getTodosEffect = atomEffect((get, set) => {
    const todosQueryPreferences = get(queryPreferencesAtom);
    const user = get(userAtom);
    if (!user) return;

    http.api
        .todosList({
            orderBy: todosQueryPreferences.orderBy,
            direction: todosQueryPreferences.direction,
            serializedTagArray: JSON.stringify(todosQueryPreferences.tags),
            limit: todosQueryPreferences.limit,
            showCompleted: todosQueryPreferences.showCompleted
        })
        .then((resp) => {
            set(todosAtom, resp.data);
        });
});