import {useEffect} from "react";
import { todosAtom} from "../../state/application.state.atoms.ts";
import {useAtom} from "jotai";
import {api} from "../../api.ts";
import {queryPreferencesAtom} from "../../state/forms/queryPreferencesAtom.ts";

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
        api.api.todosList(queryPreferences, {headers: {Authorization: ` ${localStorage.getItem('token')}`}})
            .then(resp => {
                if(resp.ok) return resp.json();
            })
            .then(todos => setTodos(todos))
            .catch(error => console.log("Error reading response:", error));
    }, [queryPreferences]); //todo refresh
}

