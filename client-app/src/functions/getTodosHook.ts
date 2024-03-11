import {useEffect} from "react";
import {baseUrl, queryPreferencesAtom, todosAtom} from "../state.ts";
import {useAtom} from "jotai";
import {QueryPreferences} from "../components/mainview/Filters/Query.tsx";

export function getTodos() {
    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [, setTodos] = useAtom(todosAtom);

    useEffect(() => {
        fetch(buildQueryString(queryPreferences))
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            });
    }, [queryPreferences, setTodos]);
}

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