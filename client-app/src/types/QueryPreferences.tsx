export interface QueryPreferences {
    limit: number | 50;
    tags: number[];
    orderBy: string | "dueDate" | "title" | "priority" | "id";
    direction: string | "asc" | "desc";
}
