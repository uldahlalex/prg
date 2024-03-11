import {Tag} from "./tag.ts";

export interface QueryPreferences {
    filters: {
        limit: number | 50;
        selectedTags: Tag[];
    }
    orderBy: {
        field: string | "dueDate" | "title" | "priority" | "id";
        direction: string | "asc" | "desc";
    };

}