import {useEffect} from "react";
import { queryPreferencesAtom, todosAtom} from "../state.ts";
import {useAtom} from "jotai";
import {api} from "../api.ts";

/**
 * Dto is not auto generated, only the individual "properties" so i made a class for it
 */
export interface QueryPreferences {
        limit: number | 50;
        tags: number[];
    orderBy:  string | "dueDate" | "title" | "priority" | "id";
        direction: string | "asc" | "desc";
}

export function getTodos() {
    const [queryPreferences] = useAtom(queryPreferencesAtom);
    const [, setTodos] = useAtom(todosAtom);

    useEffect(() => {
        api.api.todosList(queryPreferences).then(resp => resp.json())
            .then(todos => setTodos(todos))
    }, [queryPreferences]); //todo refresh
}

